import useAxios from '@/composables/use-axios';
import { ProductUpdateForm } from '../types';

export default async function useUpdateProduct(product: ProductUpdateForm): Promise<boolean> {
  const { fetchApi } = useAxios();

  const response = await fetchApi({
    method: 'PUT',
    path: `products/${product.id}`,
    payload: product,
  });

  if (response?.status === 200) {
    return true;
  }

  return false;
}
