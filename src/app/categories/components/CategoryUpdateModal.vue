<template>
  <BaseModal ref="modalRef" @close="cancelModal()">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[800px]">
      <h2 class="text-lg text-neutral-800 font-semibold mb-4">{{ category.name }}</h2>

      <FormInput :input-values="form.name" label="Nombre" />

      <div class="flex items-center justify-between mt-8">
        <BaseButton
          custom-classes="bg-red-400 hover:bg-red-600 border border-ref-600 text-neutral-200 font-semibold"
          @click="confirming = true"
          label="Eliminar"
          icon="Delete"
          icon-clases="w-[18px] h-[18px] fill-neutral-200"
          :disabled="loadingUpdate || loadingDelete"
        />
        <div class="flex justify-end gap-2 mt-4">
          <BaseButton
            custom-classes="bg-neutral-300 hover:bg-neutral-400 text-neutral-700"
            label="Cancelar"
            @click="modalRef?.close()"
          />
          <BaseButton
            @click="submit"
            custom-classes="bg-blue-600 text-white hover:bg-blue-700"
            label="Guardar"
            icon="Save"
            :disabled="loadingUpdate || loadingDelete"
          />
        </div>
      </div>
    </div>

    <DeleteModal
      v-if="confirming"
      message="Confirma para eliminar la categoría"
      @cancel="confirming = false"
      @comfirm="handleDeleteCategory"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { useInputValue } from '@/composables/use-input-value';
import FormInput from '@/ui/inputs/FormInput.vue';
import validators from '@/utils/input-validators';
import { ref, onBeforeUnmount } from 'vue';
import BaseModal from '@/ui/modals/BaseModal.vue';
import BaseButton from '@/ui/buttons/BaseButton.vue';
import DeleteModal from '@/ui/modals/DeleteModal.vue';
import useUpdateCategory from '../composables/use-update-category';
import useDeleteCategory from '../composables/use-delete-category';
import { Category } from '../types';

interface Props {
  category: Category;
}

const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const props = defineProps<Props>();

const emit = defineEmits(['close', 'update', 'delete']);
const { update, statusUpdate, loadingUpdate } = useUpdateCategory();
const { deleteCategory, loadingDelete, statusDelete } = useDeleteCategory();

const confirming = ref(false);

const initialFormState = () => ({
  name: useInputValue(props.category.name, validators.notEmpty),
});

const form = ref(initialFormState());

onBeforeUnmount(() => {
  resetForm();
});

function resetForm() {
  form.value = initialFormState();
}

function cancelModal() {
  resetForm();
  emit('close');
}

function validateForm(): boolean {
  return form.value.name.validate();
}

async function submit() {
  if (loadingDelete.value || loadingUpdate.value) return;
  const validated = validateForm();
  if (!validated) return;

  const categoryData = {
    id: props.category.id,
    name: form.value.name.text,
  };

  await update(categoryData);

  if (statusUpdate.value === 200) {
    modalRef.value?.close();
    emit('update');
  }
}

async function handleDeleteCategory() {
  if (loadingDelete.value || loadingUpdate.value) return;

  confirming.value = false;
  await deleteCategory(props.category);

  if (statusDelete.value === 200) {
    modalRef.value?.close();
    emit('delete');
  }
}
</script>
