import useAxios from '@/composables/use-axios';
import { Product } from '../types';

export default async function useDeleteProduct(product: Product): Promise<boolean> {
  const { fetchApi } = useAxios();

  const response = await fetchApi({ method: 'DELETE', path: `products/${product.id}` });

  if (response?.status === 200) {
    return true;
  }

  return false;
}
