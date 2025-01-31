export type ComponentInfo = {
  family: string;
  name: string;
  purpose: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  unit_cost: string;
  other_cost: string;
  available_quantity: string;
  required_quantity: string;
  invoice_number: string;
  suppliers_name: string;
  suppliers_contact_details: string;
  receipt_date: string;
};

export type DeviceInfo = {
  name: string;
  purpose: string;
  electrical_supply: string;
  size: string;
  available_quantity: string;
  unit_cost: string;
};

export type StorageInfo = {
  cabinet: string;
  shelf: string;
  drawer: string;
};
