import useAxios from '@/composables/use-axios';
import { ProductCreateForm } from '../types';
import { useToastStore } from '@/app/toasts/toasts-store';

export default function useCreateProduct() {
  const { fetchApi, loading: loadingCreate, status: statusCreate } = useAxios();
  const toastStore = useToastStore();
  async function create(payload: ProductCreateForm) {
    await fetchApi({ method: 'POST', path: 'products', payload });

    if (statusCreate.value === 201) {
      toastStore.addToast({ type: 'success', message: 'Producto creado' });
    }
  }

  return { create, loadingCreate, statusCreate };
}
