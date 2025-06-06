import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Category } from '../types';
import useAxios from '@/composables/use-axios';

export type CategoriesStoreType = ReturnType<typeof useCategoriesStore>;

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);
  const { fetchApi, status: statusCategories, loading } = useAxios();

  async function fetchCategories(): Promise<void> {
    const response = await fetchApi<{ data: Category[] }>({ path: 'categories' });

    if (response?.status === 200) {
      categories.value = response.data.data;
    }
  }

  return { categories, fetchCategories, statusCategories, loading };
});
