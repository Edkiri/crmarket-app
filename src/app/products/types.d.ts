export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  reference: string;
  is_active: boolean;
  stock?: number;
  cost_price?: number;
  sale_price?: number;
  brand?: string;
  description?: string;
  categories: Category[];
}

export interface ProductQueryInterface {
  page?: number;
  reference?: string;
  name?: string;
  brand?: string;
  is_active?: number;
  min_sale_price?: number;
  max_sale_price?: number;
  category_ids?: number[];
  market_id?: number;
}
