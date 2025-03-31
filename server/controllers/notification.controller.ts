import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { ResponseStatus } from "../types/type";
import { Component, Storage, FilterTermsComponent } from "../types/type";

type Notification = {
  id: string | number;
  name: string;
  activeStatus: string | number;
};

export const getNotification = async (req: Request, res: Response) => {
  let conn;

  try {
    conn = await createConnection();

    const query = `SELECT n.id, c.name, n.activeStatus FROM notifications n
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

export const updateNotification = async (req: Request, res: Response) => {
  let conn;
  let id = req.body.id as string;
  const activeStatus = req.body.activeStatus as string | Number;

  let status: ResponseStatus;

  try {
    conn = await createConnection();

    console.log(activeStatus);

    const updateQuery = `
      UPDATE notifications
      SET 
      activeStatus = ? WHERE id = ?`;

    await conn
      .query(updateQuery, [activeStatus, id])
      .then(() => {
        status = {
          status: "updated",
          message: "სტატუსი წარმატებით განახლდა",
        };
        res.send(status);
      })
      .catch((err) => {
        status = {
          status: "update_error",
          message: "სტატუსი ვერ განახლდა",
        };
        res.send(status);
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } finally {
    if (conn) conn.release();
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  let conn;
  const id = req.params.id as string;

  let status: ResponseStatus;

  try {
    conn = await createConnection();
    const query = `DELETE FROM notifications WHERE id = ?`;

    const result = await conn.query(query, [id]);

    if (result.affectedRows === 0) {
      status = {
        status: "delete_error",
        message: "შეტყობინება ვერ წაიშალა",
      };
      res.send(status);
      return;
    } else {
      status = {
        status: "deleted",
        message: "შეტყობინება წარმატებით წაიშალა",
      };
      res.send(status);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  } finally {
    if (conn) await conn.release();
  }
};
