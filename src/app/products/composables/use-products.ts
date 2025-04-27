import { Ref } from 'vue';
import useAxios from '@/composables/use-axios';
import { Product, ProductQuery } from '../types';
import { PaginatedResponse } from '@/types/laravel-response';

export default function useProducts(products: Ref<Product[]>) {
  const {
    fetchApi,
    loading: loadingProducts,
    error: errorProducts,
    status: statusProducts,
  } = useAxios();

  async function fetchProducts(
    query: ProductQuery
  ): Promise<PaginatedResponse<Product> | undefined> {
    const response = await fetchApi<PaginatedResponse<Product>>({
      path: 'products',
      payload: query,
    });

    if (response?.status === 200) {
      products.value = response.data.data;
      return response.data;
    }
  }

  return { fetchProducts, loadingProducts, errorProducts, statusProducts };
}
