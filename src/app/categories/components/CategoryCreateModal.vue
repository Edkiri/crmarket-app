<template>
  <BaseModal ref="modalRef" @close="cancelModal()">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[800px]">
      <h2 class="text-lg text-neutral-800 font-semibold mb-4">Crear Categoría</h2>

      <FormInput :input-values="form.name" label="Nombre" />

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
          :disabled="loadingCategories"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { useInputValue } from '@/composables/use-input-value';
import FormInput from '@/ui/inputs/FormInput.vue';
import validators from '@/utils/input-validators';
import { ref, onBeforeUnmount } from 'vue';
import BaseModal from '@/ui/modals/BaseModal.vue';
import BaseButton from '@/ui/buttons/BaseButton.vue';
import useCreateCategory from '../composables/use-create-category';

const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const emit = defineEmits(['close', 'created']);
const { create, loadingCategories, statusCreate } = useCreateCategory();

const initialFormState = () => ({
  name: useInputValue('', validators.notEmpty),
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
  const validated = validateForm();
  if (!validated) return;
  const categoryData = {
    name: form.value.name.text,
  };
  await create(categoryData);

  if (statusCreate.value === 201) {
    modalRef.value?.close();
    emit('created');
  }
}
</script>
