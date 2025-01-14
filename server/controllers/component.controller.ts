import { Request, Response } from "express";
import { createConnection } from "../db/database";

export const getComponents = async (req: Request, res: Response) => {
  let conn;

  const searchTerm = req.query.searchTerm || "";
  const page = req.query.page || "1";
  const pageSize = 10;
  const offset = (+page - 1) * pageSize;

  try {
    conn = await createConnection();

    const query = `
     SELECT * FROM components c
     WHERE name LIKE ? 
     OR family LIKE ? 
     OR package_type LIKE ?
     OR nominal_value LIKE ?
     OR electrical_supply LIKE ?
     OR suppliers_name LIKE ?
     LIMIT ? OFFSET ?`;

    const searchValue = `%${searchTerm}%`;

    const components = await conn.query(query, [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
    ]);

    res.send(components);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};
