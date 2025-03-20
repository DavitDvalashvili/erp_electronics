import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { ResponseStatus } from "../types/type";
import { Component, Storage, FilterTermsComponent } from "../types/type";
import { error } from "console";

export const getComponents = async (req: Request, res: Response) => {
  let conn;

  const name = (req.query.name as string) || "";
  const family = (req.query.family as string) || "";
  const package_type = (req.query.package_type as string) || "";
  const nominal_value = (req.query.nominal_value as string) || "";
  const electrical_supply = (req.query.electrical_supply as string) || "";
  const suppliers_name = (req.query.suppliers_name as string) || "";
  const cabinet = (req.query.cabinet as string) || "";
  const shelf = (req.query.shelf as string) || "";
  const drawer = (req.query.drawer as string) || "";
  const searchTerm = (req.query.searchTerm as string) || "";
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string);
  const offset = (page - 1) * pageSize;

  try {
    conn = await createConnection();

    // Base query
    let query = `
                  SELECT 
              c.*, s.cabinet, s.shelf, s.drawer,
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
              components c
            JOIN 
              storage s ON s.component_id = c.id
            LEFT JOIN 
              images i ON i.component_id = c.id
            WHERE 
              (c.name LIKE ? OR c.family LIKE ? OR c.package_type LIKE ? 
              OR c.nominal_value LIKE ? OR c.electrical_supply LIKE ? 
              OR c.suppliers_name LIKE ? OR s.cabinet LIKE ? OR s.shelf LIKE ? 
              OR s.drawer LIKE ?)
            GROUP BY 
              c.id, s.cabinet, s.shelf, s.drawer
            ORDER BY C.id DESC`;

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
      query += ` AND s.cabinet LIKE ?`;
      params.push(`%${cabinet}%`);
    }
    if (shelf) {
      query += ` AND s.shelf LIKE ?`;
      params.push(`%${shelf}%`);
    }
    if (drawer) {
      query += ` AND s.drawer LIKE ?`;
      params.push(`%${drawer}%`);
    }

    // Add pagination if pageSize is provided
    if (pageSize) {
      query += ` LIMIT ? OFFSET ?`;
      params.push(pageSize, offset);
    }

    // Execute the query
    const components: Component[] = await conn.query(query, params);

    res.send(components);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching components" });
  } finally {
    if (conn) {
      try {
        conn.release();
      } catch (error) {
        console.error("An error occurred while fetching components:", error);
      }
    }
  }
};

export const getComponent = async (req: Request, res: Response) => {
  let conn;
  const id = req.params.id as string | number;

  try {
    conn = await createConnection();

    const query = `
      SELECT 
        c.*, 
        s.cabinet, 
        s.drawer, 
        s.shelf,
        COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'image_url', i.image_url,
            'image_id', i.id
          )), 
        JSON_ARRAY()
      ) AS images
      FROM components c
      JOIN storage s ON s.component_id = c.id
      LEFT JOIN images i ON i.component_id = c.id
      WHERE c.id = ?
      GROUP BY c.id, s.cabinet, s.drawer, s.shelf
    `;

    const [component]: Component[] = await conn.query(query, [id]);

    res.send(component);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching component" });
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
  } = <Component>req.body;

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
  ];

  try {
    conn = await createConnection();

    if (!name || !available_quantity || !required_quantity) {
      status = {
        status: "insert_error",
        message: "შეავსეთ ყველა სავალდებულო ველი",
      };
      res.send(status);
    }

    const insertQuery = `
   INSERT INTO components 
    (family, name, purpose, package_type, nominal_value, electrical_supply, 
    unit_cost, other_cost, available_quantity, required_quantity, invoice_number, 
    suppliers_name, suppliers_contact_details, receipt_date) 
   VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    const component = await conn.query(insertQuery, [...componentInfo]);

    if (component.affectedRows > 0) {
      await conn
        .query(
          `INSERT INTO storage (cabinet, shelf, drawer, component_id) VALUES (?, ?, ?, ?)`,
          [cabinet, shelf, drawer, component.insertId]
        )
        .then((result) => {
          status = {
            status: "inserted",
            message: "კომპონენტი წარმატებით დაემატა",
            insert_id: Number(component.insertId),
          };
          res.send(status);
        })
        .catch((err) => {
          status = {
            status: "insert_error",
            message: "კომპონენტი ვერ დაემატა",
          };
          res.send(status);
          console.log(err);
        });
    } else {
      status = {
        status: "insert_error",
        message: "კომპონენტი ვერ დაემატა",
      };
      res.send(status);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(error);
  } finally {
    if (conn) conn.release();
  }
};

export const updateComponent = async (req: Request, res: Response) => {
  let conn;
  let id = req.params.id as string | number;

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
  } = <Component>req.body;

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
  ];

  try {
    conn = await createConnection();

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
        receipt_date = ?
      WHERE id = ?`;

    const updatedComponent = await conn.query(updateQuery, [
      ...componentInfo,
      id,
    ]);

    console.log(updatedComponent);

    if (updatedComponent.affectedRows > 0) {
      await conn
        .query(
          `UPDATE storage SET cabinet = ? , shelf = ? , drawer = ? WHERE component_id = ?`,
          [cabinet, shelf, drawer, id]
        )
        .then((result) => {
          status = {
            status: "updated",
            message: "კომპონენტი წარმატებით განახლდა",
          };
          res.send(status);
        })
        .catch((err) => {
          status = {
            status: "update_error",
            message: "კომპონენტი ვერ განახლდა",
          };
          res.send(status);
        });
    } else {
      status = {
        status: "update_error",
        message: "კომპონენტი ვერ განახლდა",
      };
      res.send(status);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(error);
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
      status = {
        status: "delete_error",
        message: "კომპონენტი ვერ წაიშალა",
      };
      res.send(status);
      return;
    } else {
      status = {
        status: "deleted",
        message: "კომპონენტი წაიშალა წარმატებით",
      };
      res.send(status);
    }
  } catch (err) {
    res.status(500).send(error);
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
        JSON_ARRAYAGG(c.name) AS names,
        JSON_ARRAYAGG(c.family) AS families,
        JSON_ARRAYAGG(c.package_type) AS package_types,
        JSON_ARRAYAGG(c.nominal_value) AS nominal_values,
        JSON_ARRAYAGG(c.electrical_supply) AS electrical_supplies,
        JSON_ARRAYAGG(s.cabinet) AS cabinets,
        JSON_ARRAYAGG(s.drawer) AS drawers,
        JSON_ARRAYAGG(s.shelf) AS shelves
      FROM 
        components c
      JOIN 
        storage s ON c.id = s.component_id`;

    const filterTerms: FilterTermsComponent[] = await conn.query(query);

    if (filterTerms.length == 0) {
      res.status(404).send({ error: "No filter terms found" });
    }

    res.send(filterTerms[0]);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching filter terms" });
  } finally {
    if (conn) conn.release();
  }
};
