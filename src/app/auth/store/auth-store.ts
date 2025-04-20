import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';

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
    const market = ref<Market | null>(null);
    const role = ref<UserRole | null>(null);

    const isAuthenticated = computed(() => !!accessToken.value);

    function logout(): void {
      const slug = market.value?.slug_name;
      accessToken.value = null;
      market.value = null;
      role.value = null;

      if (slug) {
        router.push(`/${slug}`);
        return;
      }

      router.push('/');
    }

    return { accessToken, role, market, isAuthenticated, logout };
  },
  { persist: true }
);
