<template>
  <BaseModal @close="cancelModal()">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[800px]">
      <h2 class="text-lg text-neutral-800 font-semibold mb-4">{{ product.name }}</h2>

      <FormInput :input-values="form.name" label="Nombre" />
      <FormInput :input-values="form.description" label="Descripción" />

      <div class="w-full flex gap-4 items-center">
        <FormInput :input-values="form.reference" label="Referencia" />
        <FormInput :input-values="form.brand" label="Marca" />
      </div>

      <div class="w-full flex gap-4 items-center">
        <FormInput :input-values="form.cost_price" label="Precio Costo" />
        <FormInput :input-values="form.sale_price" label="Precio Venta" />
        <FormInput :input-values="form.stock" label="Stock" />
      </div>

      <Checkbox v-model="form.is_active" label="¿Está activo?" />

      <div class="flex items-center justify-between mt-8">
        <BaseButton
          custom-classes="bg-red-400 hover:bg-red-600 border border-ref-600 text-neutral-200 font-semibold"
          @click="confirming = true"
          label="Eliminar"
          icon="Delete"
          icon-clases="w-[18px] h-[18px] fill-neutral-200"
        />
        <div class="flex justify-end gap-2 mt-4">
          <BaseButton
            custom-classes="bg-neutral-300 hover:bg-neutral-400 text-neutral-700"
            label="Cancelar"
            @click="cancelModal()"
          />
          <BaseButton
            @click="submit"
            custom-classes="bg-blue-600 text-white hover:bg-blue-700"
            label="Guardar"
            icon="Save"
          />
        </div>
      </div>
    </div>

    <DeleteModal
      v-if="confirming"
      message="Confirma para eliminar el producto"
      @cancel="confirming = false"
      @comfirm="deleteProduct()"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { useInputValue } from '@/composables/use-input-value';
import FormInput from '@/ui/inputs/FormInput.vue';
import validators from '@/utils/input-validators';
import { ref, onBeforeUnmount } from 'vue';
import BaseModal from '@/ui/modals/BaseModal.vue';
import Checkbox from '@/ui/inputs/Checkbox.vue';
import { Product } from '../types';
import useUpdateProduct from '../composables/useUpdateProduct';
import { parseIntInputValue } from '@/utils';
import BaseButton from '@/ui/buttons/BaseButton.vue';
import DeleteModal from '@/ui/modals/DeleteModal.vue';
import useDeleteProduct from '../composables/useDeleteProuduct';

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const emit = defineEmits(['close', 'update', 'delete']);

const confirming = ref(false);

const initialFormState = () => ({
  name: useInputValue(props.product.name, validators.notEmpty),
  reference: useInputValue(props.product.reference, validators.notEmpty),
  brand: useInputValue(props.product.brand ?? ''),
  description: useInputValue(props.product.description ?? ''),
  cost_price: useInputValue(
    parseIntInputValue(props.product.cost_price),
    validators.nonNegativeNumber
  ),
  sale_price: useInputValue(
    parseIntInputValue(props.product.sale_price),
    validators.nonNegativeNumber
  ),
  stock: useInputValue(parseIntInputValue(props.product.stock), validators.nonNegativeNumber),
  categoryIds: [],
  is_active: Boolean(props.product.is_active),
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
    id: props.product.id,
    name: form.value.name.text,
    reference: form.value.reference.text,
    brand: form.value.brand.text,
    description: form.value.description.text,
    cost_price: form.value.cost_price.text ? parseFloat(form.value.cost_price.text) : null,
    sale_price: form.value.sale_price.text ? parseFloat(form.value.sale_price.text) : null,
    stock: form.value.stock.text ? parseFloat(form.value.stock.text) : null,
    category_ids: form.value.categoryIds,
    is_active: form.value.is_active,
  };

  const success = await useUpdateProduct(productData);

  if (success) {
    emit('update');
  }
}

async function deleteProduct() {
  confirming.value = false;
  const success = await useDeleteProduct(props.product);

  if (success) {
    emit('delete');
  }
}
</script>
