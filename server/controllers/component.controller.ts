import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { ComponentInfo } from "../@types/globals";
import { ResponseStatus } from "../@types/type";
import { stat } from "fs";

export const getComponents = async (req: Request, res: Response) => {
  let conn;

  // Extract filtering parameters
  const name = (req.query.name as string) || "";
  const family = (req.query.family as string) || "";
  const package_type = (req.query.package_type as string) || "";
  const nominal_value = (req.query.nominal_value as string) || "";
  const electrical_supply = (req.query.electrical_supply as string) || "";
  const suppliers_name = (req.query.suppliers_name as string) || "";
  const cabinet = (req.query.nominal_value as string) || "";
  const shelf = (req.query.electrical_supply as string) || "";
  const drawer = (req.query.suppliers_name as string) || "";

  const searchTerm = (req.query.searchTerm as string) || "";
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = 4;
  const offset = (page - 1) * pageSize;

  try {
    conn = await createConnection();

    // Base query
    let query = `
      SELECT 
      c.name, c.family, c.package_type, c.nominal_value, c.electrical_supply, 
      c.unit_cost, c.available_quantity, c.required_quantity, c.cabinet, 
      c.drawer, c.shelf,
      (SELECT i.image_url
      FROM images i
      WHERE i.component_id = c.id
      LIMIT 1) AS image 
      FROM components c
      WHERE (c.name LIKE ? OR c.family LIKE ? OR c.package_type LIKE ?
             OR c.nominal_value LIKE ? OR c.electrical_supply LIKE ? 
             OR c.suppliers_name LIKE ? OR c.cabinet LIKE ? OR c.shelf LIKE ? OR c.drawer LIKE ?)`;

    const params: (string | number)[] = [
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
    ];

    // Add filtering conditions dynamically
    if (name) {
      query += ` AND c.name LIKE ?`;
      params.push(`%${name}%`);
    }
    if (family) {
      query += ` AND c.family LIKE ?`;
      params.push(`%${family}%`);
    }
    if (package_type) {
      query += ` AND c.package_type LIKE ?`;
      params.push(`%${package_type}%`);
    }
    if (nominal_value) {
      query += ` AND c.nominal_value LIKE ?`;
      params.push(`%${nominal_value}%`);
    }
    if (electrical_supply) {
      query += ` AND c.electrical_supply LIKE ?`;
      params.push(`%${electrical_supply}%`);
    }
    if (suppliers_name) {
      query += ` AND c.suppliers_name LIKE ?`;
      params.push(`%${suppliers_name}%`);
    }
    if (cabinet) {
      query += ` AND c.cabinet LIKE ?`;
      params.push(`%${cabinet}%`);
    }
    if (shelf) {
      query += ` AND c.shelf LIKE ?`;
      params.push(`%${shelf}%`);
    }
    if (drawer) {
      query += ` AND c.drawer LIKE ?`;
      params.push(`%${drawer}%`);
    }

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);

    // Execute the query
    const components = await conn.query(query, params);

    res.send({ components });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching components." });
  } finally {
    if (conn) conn.release();
  }
};

export const getComponent = async (req: Request, res: Response) => {
  let conn;
  const id = req.params.id as string;

  try {
    conn = await createConnection();

    const query = `
      SELECT 
        c.*, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'image_url', i.image_url,
            'image_id', i.id
          )
        ) AS images
      FROM components c
      LEFT JOIN images i ON i.component_id = c.id
      WHERE c.id = ?
      GROUP BY c.id
    `;

    const component = await conn.query(query, [id]);

    res.send(component);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching component." });
  } finally {
    if (conn) conn.release();
  }
};

export const addComponent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let conn;
  let status: ResponseStatus;

  const {
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    other_cost,
    available_quantity,
    required_quantity,
    invoice_number,
    suppliers_name,
    suppliers_contact_details,
    receipt_date,
    cabinet,
    shelf,
    drawer,
  } = <ComponentInfo>req.body;

  const componentInfo = [
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    other_cost,
    available_quantity,
    required_quantity,
    invoice_number,
    suppliers_name,
    suppliers_contact_details,
    receipt_date,
    cabinet,
    shelf,
    drawer,
  ];

  try {
    conn = await createConnection();

    if (!name || !available_quantity || !required_quantity) {
      res.status(404).send({ message: "Empty required fields" });
    }

    let existingComponent = await conn.query(
      `SELECT * FROM components c WHERE c.name = ? `,
      name
    );

    if (existingComponent.length > 0) {
      status = {
        status: "insert_exists",
        message: "Component already exists",
      };
      res.status(409).json(status);
      return;
    }

    const insertQuery = `
   INSERT INTO components 
    (family, name, purpose, package_type, nominal_value, electrical_supply, 
    unit_cost, other_cost, available_quantity, required_quantity, invoice_number, 
    suppliers_name, suppliers_contact_details, receipt_date, cabinet, shelf, drawer) 
   VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    await conn
      .query(insertQuery, [...componentInfo])
      .then(() => {
        status = {
          status: "inserted",
          message: "Component inserted successfully",
        };
        res.send(status);
      })
      .catch((err) => {
        status = {
          status: "insert_error",
          message: "An error occurred while adding component.",
        };
        res.send(status);
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    status = {
      status: "insert_error",
      message: "An error occurred while adding component.",
    };
    res.status(500).send(status);
  } finally {
    if (conn) conn.release();
  }
};

export const updateComponent = async (req: Request, res: Response) => {
  let conn;
  let id = req.params.id as string;

  let status: ResponseStatus;

  const {
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    other_cost,
    available_quantity,
    required_quantity,
    invoice_number,
    suppliers_name,
    suppliers_contact_details,
    receipt_date,
    cabinet,
    shelf,
    drawer,
  } = <ComponentInfo>req.body;

  const componentInfo = [
    family,
    name,
    purpose,
    package_type,
    nominal_value,
    electrical_supply,
    unit_cost,
    other_cost,
    available_quantity,
    required_quantity,
    invoice_number,
    suppliers_name,
    suppliers_contact_details,
    receipt_date,
    cabinet,
    shelf,
    drawer,
  ];

  try {
    conn = await createConnection();

    let existingComponent = await conn.query(
      `SELECT * FROM components WHERE name = ? AND id != ?`,
      [name, id]
    );

    if (existingComponent.length > 0) {
      status = {
        status: "update_exists",
        message: "Component already exists",
      };
      res.status(409).json(status);
      return;
    }

    const updateQuery = `
      UPDATE components
      SET 
        family = ?, 
        name = ?, 
        purpose = ?, 
        package_type = ?, 
        nominal_value = ?, 
        electrical_supply = ?, 
        unit_cost = ?, 
        other_cost = ?,
        available_quantity = ?, 
        required_quantity = ?,
        invoice_number = ?, 
        suppliers_name = ?, 
        suppliers_contact_details = ?, 
        receipt_date = ?,
        cabinet = ?,
        shelf = ?,
        drawer = ?
      WHERE id = ?`;

    await conn
      .query(updateQuery, [...componentInfo, id])
      .then(() => {
        status = {
          status: "updated",
          message: "Component updated successfully",
        };
        res.send(status);
      })
      .catch((err) => {
        status = {
          status: "update_error",
          message: "An error occurred while updating component.",
        };
        res.send(status);
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    status = {
      status: "update_error",
      message: "An error occurred while updating component.",
    };
    res.status(500).send(status);
  } finally {
    if (conn) conn.release();
  }
};

export const deleteComponent = async (req: Request, res: Response) => {
  let conn;
  const id = req.params.id as string;

  let status: ResponseStatus;

  try {
    conn = await createConnection();
    const query = `DELETE FROM components WHERE id = ?`;

    const result = await conn.query(query, [id]);

    if (result.affectedRows === 0) {
      res.status(404).send({ message: "component not found" });
      return;
    } else {
      status = {
        status: "deleted",
        message: "Component deleted successfully",
      };
      res.send(status);
    }
  } catch (err) {
    status = {
      status: "delete_error",
      message: "An error occurred while deleting component.",
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
    c.name, c.family, c.package_type, c.nominal_value, c.electrical_supply, 
    c.unit_cost, c.available_quantity, c.required_quantity, c.cabinet, 
    c.drawer, c.shelf FROM components c`;

    const filterTerms = await conn.query(query);

    if (filterTerms.length == 0) {
      res
        .status(404)
        .send({ error: "An error occurred while fetching filter terms" });
    }

    res.send(filterTerms);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching filter terms" });
  } finally {
    if (conn) conn.release();
  }
};
