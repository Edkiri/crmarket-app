import useAxios from '@/composables/use-axios';
import { Product, ProductQuery } from '../types';

export default async function useQueryProducts(query: ProductQuery): Promise<Product[]> {
  const { fetchApi } = useAxios();
  const response = await fetchApi<{ data: Product[] }>({ path: 'products', payload: query });
  if (response?.status === 200 && response.data?.data) {
    return response.data.data;
  }
  return [];
}
