export type filterTerms = {
  name: string;
  family: string;
  nominal_value: string;
  package_type: string;
  electrical_supply: string;
  cabinet: string;
  drawer: string;
  shelf: string;
};

export type filterTermsComponent = {
  cabinet: string[];
  drawer: string[];
  electronicSupply: string[];
  family: string[];
  name: string[];
  nominalValue: string[];
  packageType: string[];
  shelf: string[];
};
