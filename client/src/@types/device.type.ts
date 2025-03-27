export type FilterTerm = {
  name: string;
  electrical_supply: string;
  size: string;
};

export type FilterTerms = {
  names: string[];
  electrical_supplies: string[];
  sizes: string[];
};
