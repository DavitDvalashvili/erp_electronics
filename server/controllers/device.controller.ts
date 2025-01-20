import { Request, Response } from "express";
import { createConnection } from "../db/database";
<<<<<<< HEAD
import { ComponentInfo } from "../@types/globals";
import { ResponseStatus } from "../@types/type";

export const getDevices = async (req: Request, res: Response) => {
  let conn;

=======

export const getDevice = async (req: Request, res: Response) => {
  let conn;

  // Extract filtering parameters
>>>>>>> f8a9e46c928d6fa62a119681ce8c02c72b8ac3ba
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
<<<<<<< HEAD
        d.name, d.purpose, d.electrical_supply, d.size, d.available_quantity, 
        d.unit_cost,
        (SELECT i.image_url
        FROM images i
        WHERE i.component_id = d.id
        LIMIT 1) AS image 
        FROM devices d
        WHERE (d.name LIKE ? OR d.electrical_supply LIKE ? OR d.size LIKE ?)`;
=======
        d.name, c.family, c.package_type, c.nominal_value, c.electrical_supply, 
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
>>>>>>> f8a9e46c928d6fa62a119681ce8c02c72b8ac3ba

    const params: (string | number)[] = [
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
<<<<<<< HEAD
=======
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
      `%${searchTerm}%`,
>>>>>>> f8a9e46c928d6fa62a119681ce8c02c72b8ac3ba
    ];

    // Add filtering conditions dynamically
    if (name) {
<<<<<<< HEAD
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
=======
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
>>>>>>> f8a9e46c928d6fa62a119681ce8c02c72b8ac3ba
    }

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);

    // Execute the query
<<<<<<< HEAD
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
    res.status(500).send({ error: "An error occurred while fetching device." });
=======
    const components = await conn.query(query, params);

    res.send({ components });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching components." });
>>>>>>> f8a9e46c928d6fa62a119681ce8c02c72b8ac3ba
  } finally {
    if (conn) conn.release();
  }
};
