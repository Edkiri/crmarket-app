import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Product, ProductQueryInterface } from '../types';

export type ProductsStoreType = ReturnType<typeof useProductsStore>;

export const useProductsStore = defineStore(
  'products',
  () => {
    const products = ref<Product[]>([]);
    const query = ref<ProductQueryInterface>({
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
