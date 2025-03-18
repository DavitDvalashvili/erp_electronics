export type FilterTerm = {
  name: string;
  family: string;
  nominal_value: string;
  package_type: string;
  electrical_supply: string;
  cabinet: string;
  drawer: string;
  shelf: string;
};

export type FilterTerms = {
  names: string[];
  families: string[];
  package_types: string[];
  nominal_values: string[];
  electrical_supplies: string[];
  cabinets: string[];
  drawers: string[];
  shelves: string[];
};
