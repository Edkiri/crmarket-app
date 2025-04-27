<template>
  <BaseModal ref="modalRef" @close="cancelModal()">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[800px]">
      <h2 class="text-lg text-neutral-800 font-semibold mb-4">Crear Producto</h2>

      <FormInput :input-values="form.name" label="Nombre" />

      <FormInput :input-values="form.description" label="Descripción" />

      <div class="flex flex-col gap-1 mt-2">
        <span class="text-md text-neutral-700 font-semibold">Categorías</span>
        <CategorySelect v-model:selected="form.categories" />
      </div>

      <div class="w-full flex gap-4 items-center mt-4">
        <FormInput :input-values="form.reference" label="Referencia" />
        <FormInput :input-values="form.brand" label="Marca" />
      </div>

      <div class="w-full flex gap-4 items-center">
        <FormInput :input-values="form.cost_price" label="Precio Costo" />
        <FormInput :input-values="form.sale_price" label="Precio Venta" />
        <FormInput :input-values="form.stock" label="Stock" />
      </div>

      <Checkbox class="mt-8" v-model="form.is_active" label="¿Está activo?" />

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
          :disabled="loadingCreate"
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
import useCreateProduct from '../composables/use-create-product';
import BaseModal from '@/ui/modals/BaseModal.vue';
import Checkbox from '@/ui/inputs/Checkbox.vue';
import BaseButton from '@/ui/buttons/BaseButton.vue';
import { Category } from '@/app/categories/types';
import CategorySelect from '@/app/categories/components/CategorySelect.vue';

const { create, loadingCreate, statusCreate } = useCreateProduct();
const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const emit = defineEmits(['close', 'created']);

const initialFormState = () => ({
  name: useInputValue('', validators.notEmpty),
  reference: useInputValue('', validators.notEmpty),
  brand: useInputValue(''),
  description: useInputValue(''),
  cost_price: useInputValue('', validators.nonNegativeNumber),
  sale_price: useInputValue('', validators.nonNegativeNumber),
  stock: useInputValue('', validators.nonNegativeNumber),
  categories: [],
  is_active: true,
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
  const nameIsValid = form.value.name.validate();
  const referenceIsValid = form.value.reference.validate();
  const costPriceIsValid = form.value.cost_price.validate();
  const salePriceIsValid = form.value.sale_price.validate();
  return nameIsValid && referenceIsValid && costPriceIsValid && salePriceIsValid;
}

async function submit() {
  const validated = validateForm();
  if (!validated) return;
  const productData = {
    name: form.value.name.text,
    reference: form.value.reference.text,
    brand: form.value.brand.text,
    description: form.value.description.text,
    cost_price: form.value.cost_price.text ? parseFloat(form.value.cost_price.text) : null,
    sale_price: form.value.sale_price.text ? parseFloat(form.value.sale_price.text) : null,
    stock: form.value.stock.text ? parseFloat(form.value.stock.text) : null,
    category_ids: form.value.categories.map((item: Category) => item.id),
    is_active: form.value.is_active,
  };
  await create(productData);

  if (statusCreate.value === 201) {
    modalRef.value?.close();
    emit('created');
  }
}
</script>
