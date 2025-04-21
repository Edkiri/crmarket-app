import useAxios from '@/composables/use-axios';
import { ProductCreateForm } from '../types';

export default async function useCreateProduct(payload: ProductCreateForm): Promise<boolean> {
  const { fetchApi } = useAxios();

  const response = await fetchApi({ method: 'POST', path: 'products', payload });

  if (response?.status === 201) {
    return true;
  }

  return false;
}
