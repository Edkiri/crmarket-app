import useAxios from '@/composables/use-axios';
import { Product } from '../types';
import { useToastStore } from '@/app/toasts/toasts-store';

export default function useDeleteProduct() {
  const { fetchApi, loading: loadingDelete, status: statusDelete } = useAxios();
  const toast = useToastStore();
  async function deleteProduct(product: Product) {
    await fetchApi({ method: 'DELETE', path: `products/${product.id}` });

    if (statusDelete.value === 200) {
      toast.addToast({ type: 'success', message: 'Producto eliminado' });
    }
  }

  return { deleteProduct, loadingDelete, statusDelete };
}
