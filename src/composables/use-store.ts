import { useAuthStore } from '@/app/auth/store/auth-store';
import type { AuthStoreType } from '@/app/auth/store/auth-store';
import {
  CategoriesStoreType,
  useCategoriesStore,
} from '@/app/categories/stores/useCategoriesStore';
import { ProductsStoreType, useProductsStore } from '@/app/products/stores/products-store';

type StoreKey = 'auth' | 'products' | 'categories';

type AvailableStores = {
  auth: AuthStoreType;
  products: ProductsStoreType;
  categories: CategoriesStoreType;
};

export default function useStore<K extends StoreKey>(storeKey: K): AvailableStores[K] {
  switch (storeKey) {
    case 'auth':
      return useAuthStore() as AvailableStores[K];
    case 'products':
      return useProductsStore() as AvailableStores[K];
    case 'categories':
      return useCategoriesStore() as AvailableStores[K];
    default:
      throw new Error(`Store key "${storeKey}" is not recognized`);
  }
}
