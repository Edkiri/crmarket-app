import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { Product, ProductQuery } from '../types';
import { usePagination } from '@/composables/use-pagination';
import useProducts from '../composables/use-products';
import { parseQuery } from '../utils';
import { Category } from '@/app/categories/types';

export type ProductsStoreType = ReturnType<typeof useProductsStore>;

export interface ProductQueryForm {
  searchValue: string;
  categories: Category[];
}

export const useProductsStore = defineStore(
  'products',
  () => {
    const products = ref<Product[]>([]);
    const query = reactive<ProductQueryForm>({ searchValue: '', categories: [] });

    const { pagination, paginationMethods } = usePagination<Product, ProductQuery>();
    const { fetchProducts, errorProducts, loadingProducts, statusProducts } = useProducts(products);

    async function searchProducts() {
      if (loadingProducts.value) return;

      paginationMethods.resetPagination();
      products.value = [];

      const parsedQuery = parseQuery(query);
      const response = await fetchProducts(parsedQuery);

      if (statusProducts.value === 200 && response?.data) {
        paginationMethods.setMetadata(response, { ...parsedQuery, page: pagination.currentPage });
      }
    }

    async function changePage(page: number) {
      if (loadingProducts.value) return;
      if (!pagination.currentQuery) return;

      paginationMethods.setPage(page);
      products.value = [];

      const updatedQuery = { ...pagination.currentQuery, page };
      const response = await fetchProducts(updatedQuery);

      if (statusProducts.value === 200 && response) {
        paginationMethods.setMetadata(response, updatedQuery);
      }
    }

    async function refreshCurrentPage() {
      if (loadingProducts.value) return;
      if (!pagination.currentQuery) return;

      products.value = [];

      const response = await fetchProducts(pagination.currentQuery);

      if (statusProducts.value === 200 && response) {
        paginationMethods.setMetadata(response, pagination.currentQuery);
      }
    }

    return {
      // States
      products,
      errorProducts,
      loadingProducts,
      statusProducts,
      query,
      pagination,

      // actions
      paginationMethods,
      searchProducts,
      changePage,
      refreshCurrentPage,
    };
  },
  {
    persist: {
      pick: ['query', 'pagination'],
    },
  }
);
