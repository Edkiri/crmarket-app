import { Category } from '../categories/types';

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

export interface ProductCreateForm {
  name: string;
  reference: string;
  is_active: boolean;
  stock?: number | null;
  cost_price?: number | null;
  sale_price?: number | null;
  brand?: string | null;
  description?: string;
  category_ids?: number[];
}

export interface ProductUpdateForm {
  id: number;
  name?: string;
  reference?: string;
  is_active?: boolean;
  stock?: number | null;
  cost_price?: number | null;
  sale_price?: number | null;
  brand?: string;
  description?: string;
  category_ids?: number[];
}

export interface ProductQuery {
  page: number;
  reference?: string;
  name?: string;
  brand?: string;
  is_active?: number;
  min_sale_price?: number;
  max_sale_price?: number;
  category_ids?: number[];
  market_id?: number;
}
