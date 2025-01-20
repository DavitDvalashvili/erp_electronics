import { Request, Response } from "express";
import { createConnection } from "../db/database";
//import { DeviceInfo } from "../@types/global";
import { ResponseStatus } from "../@types/type";

export const getDevices = async (req: Request, res: Response) => {
  let conn;

  // Extract filtering parameters
  const name = (req.query.name as string) || "";
  const electrical_supply = (req.query.electrical_supply as string) || "";
  const size = (req.query.size as string) || "";

  const searchTerm = (req.query.searchTerm as string) || "";
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = 4;
  const offset = (page - 1) * pageSize;

  try {
    conn = await createConnection();

    // Base query
    let query = `
        SELECT 
        d.name, d.purpose, d.electrical_supply, d.size, d.available_quantity, 
        d.unit_cost,
        (SELECT i.image_url
        FROM images i
        WHERE i.component_id = d.id
        LIMIT 1) AS image 
        FROM devices d
        WHERE (d.name LIKE ? OR d.electrical_supply LIKE ? OR d.size LIKE ?)`;

    const params: (string | number)[] = [
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
    ];

    // Add filtering conditions dynamically
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

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);

    // Execute the query
    const devices = await conn.query(query, params);

    res.send({ devices });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ "An error occurred while fetching devices:": error });
  } finally {
    if (conn) {
      try {
        conn.release();
      } catch (error) {
        console.error("An error occurred while fetching devices:", error);
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
