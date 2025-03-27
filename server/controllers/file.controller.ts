import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { ResponseStatus } from "../types/type";
import path from "path";
import fs from "fs";

export const addImage = async (req: Request, res: Response) => {
  let conn;

  const file = req.file;
  const Id = req.query.id as String | number;
  const type = req.query.type as String;

  let response: ResponseStatus;

  try {
    const fileName = `${file?.filename}`;

    conn = await createConnection();

    if (fileName) {
      const result = await conn.query(
        `INSERT INTO images (image_url, ${
          type === "component" ? "component_id" : "device_id"
        }) VALUES (?, ?)`,
        [fileName, Id]
      );

      if (result.affectedRows > 0) {
        response = {
          status: "inserted",
          message: "ფოტო წარმატებით დაემატა",
          insert_id: Number(result.insertId),
        };
        res.send(response);
      } else {
        response = {
          status: "insert_error",
          message: "ფოტო ვერ დაემატა",
        };
        res.send(response);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } finally {
    if (conn) conn.release();
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  let conn;

  const imageId = req.params.imageId as string | number;

  let response: ResponseStatus;

  try {
    conn = await createConnection();

    const [image] = await conn.query(
      `SELECT images.image_url FROM images WHERE images.id = ?;`,
      [imageId]
    );

    if (!image) {
      res.status(404).send({ message: "Image not found" });
      return;
    }

    const fullImagePath = path.normalize(
      path.join(__dirname, "..", "files/images", image.image_url)
    );

    const result = await conn.query(
      `DELETE FROM images i
         WHERE i.id = ?`,
      [imageId]
    );

    if (result.affectedRows > 0) {
      fs.unlink(fullImagePath, (err) => {
        if (err) {
          response = {
            status: "delete_error",
            message: "ფოტო ვერ წაიშალა",
          };
          res.send(response);
          console.log(err);
          return;
        }
        response = {
          status: "deleted",
          message: "ფოტო წარმატებით წაიშალა",
        };
        res.send(response);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  } finally {
    if (conn) conn.end();
  }
};

export const addDocument = async (req: Request, res: Response) => {
  let conn;

  const file = req.file;
  const componentId = req.query.id;

  let response: ResponseStatus;

  try {
    const fileName = `${file?.filename}`;

    conn = await createConnection();

    const [document] = await conn.query(
      `SELECT components.data_sheet FROM components  WHERE components.id = ?`,
      [componentId]
    );

    if (document.data_sheet) {
      const fullDocumentPath = path.normalize(
        path.join(__dirname, "..", "files/documents", document.data_sheet)
      );
      fs.unlink(fullDocumentPath, (err) => {
        if (err) {
          response = {
            status: "update_error",
            message: "დოკუმენტი ვერ განახლდა",
          };
          res.send(response);
          return;
        }
      });
      if (fileName) {
        const result = await conn.query(
          `UPDATE components SET data_sheet = ? WHERE id = ?`,
          [fileName, componentId]
        );

        if (result.affectedRows > 0) {
          response = {
            status: "inserted",
            message: "დოკუმენტი წარმატებით დაემატა",
            insert_id: Number(result.insertId),
          };
          res.send(response);
        } else {
          response = {
            status: "insert_error",
            message: "დოკუმენტი ვერ დაემატა",
          };
          res.send(response);
        }
      }
    } else {
      if (fileName) {
        const result = await conn.query(
          `UPDATE components SET data_sheet = ? WHERE id = ?`,
          [fileName, componentId]
        );

        if (result.affectedRows > 0) {
          response = {
            status: "inserted",
            message: "დოკუმენტი წარმატებით დაემატა",
            insert_id: Number(result.insertId),
          };
          res.send(response);
        } else {
          response = {
            status: "insert_error",
            message: "დოკუმენტი ვერ დაემატა",
          };
          res.send(response);
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } finally {
    if (conn) conn.release();
  }
};
