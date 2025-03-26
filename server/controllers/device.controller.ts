import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { Device, FilterTermsDevice } from "../types/type";
import { ResponseStatus } from "../types/type";

export const getDevices = async (req: Request, res: Response) => {
  let conn;

  const name = (req.query.name as string) || "";
  const electrical_supply = (req.query.electrical_supply as string) || "";
  const size = (req.query.size as string) || "";
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string);
  const offset = (page - 1) * pageSize;

  try {
    conn = await createConnection();

    let query = `
      SELECT 
        d.*,
         COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'image_url', i.image_url,
              'image_id', i.id
            )
          ), 
          JSON_ARRAY()
        ) AS images
      FROM 
        devices d
      LEFT JOIN 
        images i ON i.device_id = d.id
      WHERE 1=1 
    `;

    const params: (string | number)[] = [];

    if (searchTerm) {
      query += ` AND (
        d.name LIKE ? OR d.electrical_supply LIKE ? OR d.size LIKE ? 
      )`;
      params.push(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`);
    }

    if (name) {
      query += ` AND d.name LIKE ?`;
      params.push(`%${name}%`);
    }
    if (electrical_supply) {
      query += ` AND d.electrical_supply LIKE ?`;
      params.push(`%${electrical_supply}%`);
    }
    if (size) {
      query += ` AND d.size LIKE ?`;
      params.push(`%${size}%`);
    }

    query += ` GROUP BY d.id ORDER BY d.id DESC`;

    if (!isNaN(pageSize) && pageSize > 0) {
      query += ` LIMIT ? OFFSET ?`;
      params.push(pageSize, offset);
    }

    const devices: [Device[]] = await conn.query(query, params);

    res.send(devices);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching devices." });
  } finally {
    if (conn) {
      try {
        conn.release();
      } catch (error) {
        console.error("An error releasing connection:", error);
      }
    }
  }
};

export const getDevice = async (req: Request, res: Response) => {
  let conn;
  const id = req.params.id as string;

  try {
    conn = await createConnection();

    const query = `
        SELECT 
          d.*, 
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'image_url', i.image_url,
              'image_id', i.id
            )
          ) AS images
        FROM devices d
        LEFT JOIN images i ON i.component_id = d.id
        WHERE d.id = ?
        GROUP BY d.id
      `;

    const [device] = await conn.query(query, [id]);

    if (!device) {
      res.status(404).send({ error: "Device not found." });
    }

    res.send(device);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching components." });
  } finally {
    if (conn) conn.release();
  }
};

export const addDevice = async (req: Request, res: Response): Promise<void> => {
  let conn;
  let status: ResponseStatus;

  const {
    name,
    purpose,
    electrical_supply,
    size,
    available_quantity,
    unit_cost,
  } = <Device>req.body;

  const deviceInfo = [
    name,
    purpose,
    electrical_supply,
    size,
    available_quantity,
    unit_cost,
  ];

  try {
    conn = await createConnection();

    if (!name || !available_quantity) {
      res.status(404).send({ message: "Empty required fields" });
    }

    let existingDevices = await conn.query(
      `SELECT * FROM devices d WHERE d.name = ? `,
      name
    );

    if (existingDevices.length > 0) {
      status = {
        status: "insert_exists",
        message: "Device already exists",
      };
      res.status(409).json(status);
      return;
    }

    const insertQuery = `
    INSERT INTO devices 
     (name, purpose, electrical_supply, size, available_quantity, unit_cost) 
      VALUES 
     (?, ?, ?, ?, ?, ?)
    `;

    await conn
      .query(insertQuery, [...deviceInfo])
      .then(() => {
        status = {
          status: "inserted",
          message: "Device inserted successfully",
        };
        res.send(status);
      })
      .catch((err) => {
        status = {
          status: "insert_error",
          message: "An error occurred while adding device.",
        };
        res.send(status);
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    status = {
      status: "insert_error",
      message: "An error occurred while adding device.",
    };
    res.status(500).send(status);
  } finally {
    if (conn) conn.release();
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  let conn;
  let id = req.params.id as string;

  let status: ResponseStatus;

  const {
    name,
    purpose,
    electrical_supply,
    size,
    available_quantity,
    unit_cost,
  } = <Device>req.body;

  const deviceInfo = [
    name,
    purpose,
    electrical_supply,
    size,
    available_quantity,
    unit_cost,
  ];

  try {
    conn = await createConnection();

    let existingDevice = await conn.query(
      `SELECT * FROM devices WHERE name = ? AND id != ?`,
      [name, id]
    );

    if (existingDevice.length > 0) {
      status = {
        status: "update_exists",
        message: "Device already exists",
      };
      res.status(409).json(status);
      return;
    }

    const updateQuery = `
      UPDATE devices
      SET 
      name = ?,
      purpose = ?,
      electrical_supply = ?,
      size = ?,
      available_quantity = ?,
      unit_cost = ?
      WHERE id = ?`;

    await conn
      .query(updateQuery, [...deviceInfo, id])
      .then(() => {
        status = {
          status: "updated",
          message: "Device updated successfully",
        };
        res.send(status);
      })
      .catch((err) => {
        status = {
          status: "update_error",
          message: "An error occurred while updating device.",
        };
        res.send(status);
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    status = {
      status: "update_error",
      message: "An error occurred while updating device.",
    };
    res.status(500).send(status);
  } finally {
    if (conn) conn.release();
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  let conn;
  const id = req.params.id as string;

  let status: ResponseStatus;

  try {
    conn = await createConnection();
    const query = `DELETE FROM devices WHERE id = ?`;

    const result = await conn.query(query, [id]);

    if (result.affectedRows === 0) {
      res.status(404).send({ message: "device not found." });
      return;
    } else {
      status = {
        status: "deleted",
        message: "Device deleted successfully.",
      };
      res.send(status);
    }
  } catch (err) {
    status = {
      status: "delete_error",
      message: "An error occurred while deleting device.",
    };
    res.status(500).send(status);
    console.log(err);
  } finally {
    if (conn) await conn.release();
  }
};

export const getFilterTerms = async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await createConnection();

    let query = `SELECT 
        JSON_ARRAYAGG(d.name) AS names,
        JSON_ARRAYAGG(d.electrical_supply) AS electrical_supplies,
        JSON_ARRAYAGG(d.size) AS sizes
      FROM 
        devices d`;

    const filterTerms: FilterTermsDevice[] = await conn.query(query);

    if (filterTerms.length == 0) {
      res.status(404).send({ error: "No filter terms found" });
    }

    res.send(filterTerms[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ "An error filter terms": error });
  } finally {
    if (conn) conn.release();
  }
};
