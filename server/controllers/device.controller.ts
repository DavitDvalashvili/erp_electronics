import { Request, Response } from "express";
import { createConnection } from "../db/database";

export const getDevice = async (req: Request, res: Response) => {
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
