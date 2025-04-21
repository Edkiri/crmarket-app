<template>
  <BaseTable class="mt-8" :headers="headers" :items="products">
    <template #item-categories="{ item }">
      <div class="flex items-center gap-1">
        <span
          class="text-sm rounded-md p-[1px] px-2 bg-neutral-300"
          v-for="category in item.categories"
        >
          {{ category.name }}
        </span>
      </div>
    </template>

    <template #item-name="{ item }">
      <button
        @click="$emit('select', item as Product)"
        class="cursor-pointer hover:text-blue-400 hover:underline"
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
  { text: 'Precio', itemKey: 'sale_price', width: 100 },
]);
</script>
