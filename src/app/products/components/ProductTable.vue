<template>
  <BaseTable :headers="headers" :items="products">
    <template #item-categories="{ item }">
      <div class="flex items-center gap-1 overflow-x-scroll max-w-[400px] h-8">
        <span
          class="block text-xs rounded-md px-1 bg-neutral-300 min-w-max"
          v-for="category in item.categories"
        >
          {{ category.name }}
        </span>
      </div>
    </template>

    <template #item-reference="{ item }">
      <span class="block min-w-max">
        {{ item.reference }}
      </span>
    </template>

    <template #item-name="{ item }">
      <button
        @click="$emit('select', item as Product)"
        class="cursor-pointer hover:text-blue-400 hover:underline min-w-max"
        type="button"
      >
        {{ item.name }}
      </button>
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseTable, { TableHeader } from '@/ui/tables/BaseTable.vue';
import { Product } from '../types';

interface ProductTableInterface {
  products: Product[];
}

defineProps<ProductTableInterface>();
defineEmits<{
  (e: 'select', product: Product): void;
}>();

const headers = ref<TableHeader[]>([
  { text: 'Nombre', itemKey: 'name' },
  { text: 'Referencia', itemKey: 'reference' },
  { text: 'Categorías', itemKey: 'categories' },
  { text: 'Stock', itemKey: 'stock', width: 80 },
  { text: 'Precio', itemKey: 'sale_price', width: 120 },
]);
</script>
