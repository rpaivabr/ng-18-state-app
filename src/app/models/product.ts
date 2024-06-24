export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
  image_url: string;
};

export type ProductState = {
  products: Product[];
  selectedProduct: Product | null;
};
