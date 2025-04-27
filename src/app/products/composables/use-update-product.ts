import useAxios from '@/composables/use-axios';
import { ProductUpdateForm } from '../types';
import { useToastStore } from '@/app/toasts/toasts-store';

export default function useUpdateProduct() {
  const { fetchApi, loading: loadingUpdate, status: stausUpdate } = useAxios();
  const toastStore = useToastStore();

  async function update(product: ProductUpdateForm) {
    await fetchApi({
      method: 'PUT',
      path: `products/${product.id}`,
      payload: product,
    });

    if (stausUpdate.value === 200) {
      toastStore.addToast({ type: 'success', message: 'Producto actualizado' });
    }
  }

  return { update, loadingUpdate, stausUpdate };
}
