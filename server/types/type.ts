export type ResponseStatus = {
  status:
    | "inserted"
    | "insert_exists"
    | "insert_error"
    | "updated"
    | "update_exists"
    | "update_error"
    | "deleted"
    | "delete_error";
  message: string;
  insert_id?: number | string;
};

export type Image = {
  image_id: number;
  image_url: string;
};

export type Component = {
  id?: string | number;
  family: string;
  name: string;
  purpose: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  unit_cost: string | number;
  other_cost: string | number;
  available_quantity: string | number;
  required_quantity: string | number;
  suppliers_name: string;
  suppliers_contact_details: string;
  receipt_date: string;
  data_sheet: string;
  invoice_number: string;
  cabinet: string;
  drawer: string;
  shelf: string;
  images: Image[];
};

export type Storage = {
  id?: string | number;
  component_id?: string | number;
  device_id?: string | number;
  cabinet: string;
  shelf: string;
  drawer: string;
};

export type Device = {
  name: string;
  purpose: string;
  electrical_supply: string;
  size: string;
  available_quantity: string;
  unit_cost: string;
};

export type FilterTermsComponent = {
  names: string[];
  families: string[];
  package_types: string[];
  nominal_values: string[];
  electrical_supplies: string[];
  cabinets: string[];
  drawers: string[];
  shelves: string[];
};
