<script setup lang="ts">
import { useClickOutside } from '@/composables/use-click-outside';
import { useInputValue } from '@/composables/use-input-value';
import FormInput from '@/ui/inputs/FormInput.vue';
import validators from '@/utils/input-validators';
import { ref, onBeforeUnmount } from 'vue';

const emit = defineEmits(['close']);

// Estado inicial del formulario
const initialFormState = () => ({
  name: useInputValue('', validators.notEmpty),
  reference: useInputValue('', validators.notEmpty),
  brand: useInputValue(''),
  description: useInputValue(''),
  cost_price: useInputValue('', [validators.notEmpty, validators.nonNegativeNumber]),
  sale_price: useInputValue('', [validators.notEmpty, validators.nonNegativeNumber]),
  categoryIds: [],
  is_active: true,
});

const form = ref(initialFormState());

const isOpen = ref(true);
const modalRef = ref(null);

useClickOutside(modalRef, () => {
  closeModal();
});

onBeforeUnmount(() => {
  resetForm();
});

function resetForm() {
  form.value = initialFormState();
}

function closeModal() {
  isOpen.value = false;
  setTimeout(() => {
    emit('close');
  }, 400);
}

function cancelModal() {
  resetForm();
  closeModal();
}

function validateForm(): boolean {
  const nameIsValid = form.value.name.validate();
  const referenceIsValid = form.value.reference.validate();
  const costPriceIsValid = form.value.cost_price.validate();
  const salePriceIsValid = form.value.sale_price.validate();
  return nameIsValid && referenceIsValid && costPriceIsValid && salePriceIsValid;
}

function submit() {
  const validated = validateForm();
  if (!validated) return;
  // Crear objeto con los datos para enviar
  const productData = {
    name: form.value.name.text,
    reference: form.value.reference.text,
    brand: form.value.brand.text,
    description: form.value.description.text,
    cost_price: form.value.cost_price.text ? parseFloat(form.value.cost_price.text) : 0,
    sale_price: form.value.sale_price.text ? parseFloat(form.value.sale_price.text) : 0,
    categoryIds: form.value.categoryIds,
    is_active: form.value.is_active,
  };

  console.log('Producto a guardar:', productData);

  // Aquí iría el código para guardar el producto en la API
  // await saveProduct(productData);

  // Cerrar el modal después de guardar exitosamente
  closeModal();
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-400"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div ref="modalRef" class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 class="text-lg font-semibold mb-4">Crear Producto</h2>
        <FormInput :input-values="form.name" label="Nombre" />
        <FormInput :input-values="form.reference" label="Referencia" />
        <FormInput :input-values="form.brand" label="Marca" />
        <FormInput :input-values="form.description" label="Descripción" />
        <FormInput :input-values="form.cost_price" label="Precio Costo" />
        <FormInput :input-values="form.sale_price" label="Precio Venta" type="number" />

        <!-- Checkbox para is_active -->
        <div class="flex items-center mt-4 mb-4">
          <input
            id="is-active"
            v-model="form.is_active"
            type="checkbox"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="is-active" class="ml-2 text-sm text-gray-700">Producto activo</label>
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button
            @click="cancelModal"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
