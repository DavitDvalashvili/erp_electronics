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

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

type Components = {
  id: number | string;
  name: string;
  family: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  unit_cost: number;
  available_quantity: number;
  required_quantity: number;
  cabinet: string;
  shelf: string;
  drawer: string;
  image: string;
};

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
  image_id: number;
  image_url: string;
};

type Component = {
  id: string | number;
  family: string;
  name: string;
  purpose: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  unit_cost: string | number;
  other_cost: string;
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
