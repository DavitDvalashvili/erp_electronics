import { Request, Response } from "express";

import { createConnection } from "../db/database";

export const testController = async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await createConnection();
    res.send("success");
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};
