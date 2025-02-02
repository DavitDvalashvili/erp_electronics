type Component = {
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
