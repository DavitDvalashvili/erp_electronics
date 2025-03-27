/// <reference types="vite/client" />

declare module "swiper/css";
declare module "swiper/css/effect-flip";
declare module "swiper/css/pagination";
declare module "swiper/css/navigation";

type ResponseStatus = {
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

type Modal =
  | "add_component"
  | "add_device"
  | "update_component"
  | "update_device"
  | "update_component_quantity"
  | "update_device_quantity"
  | "update_position"
  | "delete_component"
  | "delete_device"
  | "add_image"
  | "delete_image"
  | "view_pdf"
  | "view_components"
  | "fasten_components"
  | null;

interface Props {
  title: string;
  children: React.ReactNode;
}

type QueryComponent = {
  names: string;
  families: string;
  package_types: string;
  nominal_values: string;
  electrical_supplies: string;
  suppliers_name: string;
  cabinets: string;
  shelves: string;
  drawers: string;
  searchTerm: string;
  page: number;
  pageSize: number;
};

type Image = {
  image_id: number | null;
  image_url: string;
};

type Component = {
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

type Device = {
  id?: string | number;
  name: string;
  purpose: string;
  electrical_supply: string;
  size: string;
  available_quantity: string | number;
  unit_cost: string | number;
  images: Image[];
};

type QueryDevice = {
  names: string;
  electrical_supplies: string;
  sizes: string;
  searchTerm: string;
  page: number;
  pageSize: number;
};
