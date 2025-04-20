import { useAuthStore } from '@/app/auth/store/auth-store';
import type { AuthStoreType } from '@/app/auth/store/auth-store';
import { ProductsStoreType, useProductsStore } from '@/app/products/stores/products-store';

type StoreKey = 'auth' | 'products';

type StoreMap = {
  auth: AuthStoreType;
  products: ProductsStoreType;
};

export default function useStore<K extends StoreKey>(storeKey: K): StoreMap[K] {
  switch (storeKey) {
    case 'auth':
      return useAuthStore() as StoreMap[K];
    case 'products':
      return useProductsStore() as StoreMap[K];
    default:
      throw new Error(`Store key "${storeKey}" is not recognized`);
  }
}
