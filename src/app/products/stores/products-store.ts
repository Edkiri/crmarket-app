import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Product, ProductQuery } from '../types';

export type ProductsStoreType = ReturnType<typeof useProductsStore>;

export const useProductsStore = defineStore(
  'products',
  () => {
    const products = ref<Product[]>([]);
    const query = ref<ProductQuery>({
      name: '',
    });

    return { products, query };
  },
  {
    persist: {
      pick: ['query'],
    },
  }
);
