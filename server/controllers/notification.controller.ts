import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { ResponseStatus } from "../types/type";
import { Component, Storage, FilterTermsComponent } from "../types/type";

type Notification = {
  id: string | number;
  name: string;
  status: string | number;
};

export const getNotification = async (req: Request, res: Response) => {
  let conn;

  try {
    conn = await createConnection();

    const query = `SELECT n.id, c.name, n.status FROM notifications n
                    JOIN components c ON c.id = n.component_id;`;

    const notifications: Notification[] = await conn.query(query);

    res.send(notifications);
  } catch (error) {
    console.log(error);
    res.status(505).send({ "An error fetching component": error });
  } finally {
    if (conn) conn.release();
  }
};
