import useAxios from '@/composables/use-axios';
import useStore from '@/composables/use-store';

interface CartegoryCreateForm {
  name: string;
}

export default function useCreateCategory() {
  const { fetchApi, status: statusCreate, loading: loadingCategories } = useAxios();

  async function create(payload: CartegoryCreateForm) {
    await fetchApi({ method: 'POST', path: 'categories', payload });
    if (statusCreate.value === 201) {
      useStore('toast').addToast({ type: 'success', message: 'Categoría creada' });
    }
  }

  return { create, statusCreate, loadingCategories };
}
