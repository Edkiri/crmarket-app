import { useAuthStore } from '@/stores/auth-store';
import type { AuthStoreType } from '@/stores/auth-store';

type StoreKey = 'auth';

type StoreMap = {
  auth: AuthStoreType;
};

export default function useStore<K extends StoreKey>(storeKey: K): StoreMap[K] {
  switch (storeKey) {
    case 'auth':
      return useAuthStore() as StoreMap[K];
    default:
      throw new Error(`Store key "${storeKey}" is not recognized`);
  }
}
