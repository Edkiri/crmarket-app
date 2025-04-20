import { ref } from 'vue';
import { defineStore } from 'pinia';

export type AuthStoreType = ReturnType<typeof useAuthStore>;

export interface Market {
  id: number;
  slug_name: string;
  name: string;
  icon: string;
}

export enum UserRole {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  VIEWER = 3,
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref<string | null>(null);
    const marketSlug = ref<string | null>(null);
    const market = ref<Market | null>(null);
    const role = ref<UserRole | null>(null);

    return { marketSlug, accessToken, role, market };
  },
  {
    persist: {
      beforeHydrate: ctx => {
        console.log(`about to hydrate '${ctx.store.$id}'`);
      },
      afterHydrate: ctx => {
        console.log(`just hydrated '${ctx.store.$id}'`);
      },
    },
  }
);
