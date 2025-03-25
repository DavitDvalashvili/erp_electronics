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
  | "update_component"
  | "update_component_quantity"
  | "update_position"
  | "delete_component"
  | "add_image"
  | "delete_image"
  | "view_pdf"
  | null;

interface Props {
  title: string;
  children: React.ReactNode;
}

type QueryComponent = {
  name: string;
  family: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  suppliers_name: string;
  cabinet: string;
  shelf: string;
  drawer: string;
  searchTerm: string;
  page: number;
  pageSize: number;
};

type Image = {
  image_id: number | null;
  image_url: string;
  preview?: boolean;
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
