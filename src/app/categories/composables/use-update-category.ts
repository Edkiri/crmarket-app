import useAxios from '@/composables/use-axios';
import { Category } from '../types';
import useStore from '@/composables/use-store';

export default function useUpdateCategory() {
  const { fetchApi, status: statusUpdate, loading: loadingUpdate } = useAxios();

  async function update(category: Category) {
    await fetchApi({
      method: 'PUT',
      path: `categories/${category.id}`,
      payload: category,
    });
    if (statusUpdate.value === 200) {
      useStore('toast').addToast({ type: 'success', message: 'Categoría actualizada' });
    }
  }

  return { update, statusUpdate, loadingUpdate };
}
