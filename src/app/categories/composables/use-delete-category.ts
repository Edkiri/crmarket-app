import useAxios from '@/composables/use-axios';
import { Category } from '../types';
import useStore from '@/composables/use-store';

export default function useDeleteCategory() {
  const { fetchApi, status: statusDelete, loading: loadingDelete } = useAxios();

  async function deleteCategory(category: Category) {
    await fetchApi({ method: 'DELETE', path: `categories/${category.id}` });

    if (statusDelete.value === 200) {
      useStore('toast').addToast({ type: 'success', message: 'Categoría eliminada' });
    }
  }

  return { deleteCategory, statusDelete, loadingDelete };
}
