<template>
  <form class="flex" @submit.prevent="handleSearch">
    <div class="grow">
      <input
        class="w-full text-[14px] text-gray-400 focus:border-blue-500 outline-none h-8 px-3 py-[5px] border border-gray-700 rounded-l-md focus:inset-shadow-blue-inner"
        type="text"
        placeholder="Buscar productos..."
        v-model="query.name"
      />
    </div>

    <button
      class="cursor-pointer w-8 h-8 flex justify-center items-center border border-l-0 border-gray-700 rounded-r-md bg-blue-200"
      type="submit"
    >
      <Search class="w-[16px] h-[16px] fill-neutral-700" />
    </button>
  </form>

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
  </BaseTable>
</template>

<script setup lang="ts">
import Search from '@/ui/icons/Search.vue';
import BaseTable, { TableHeader } from '@/ui/tables/BaseTable.vue';
import { onMounted, ref } from 'vue';
import useQueryProducts from '../composables/useQueryProducts';
import useStore from '@/composables/use-store';
import { storeToRefs } from 'pinia';

const { products, query } = storeToRefs(useStore('products'));

const headers = ref<TableHeader[]>([
  { text: 'Nombre', itemKey: 'name' },
  { text: 'Referencia', itemKey: 'reference' },
  { text: 'Categorías', itemKey: 'categories' },
  { text: 'Stock', itemKey: 'stock', width: 80 },
  { text: 'Precio', itemKey: 'sale_price', width: 100 },
]);

onMounted(handleSearch);

async function handleSearch() {
  products.value = await useQueryProducts(query.value);
}
</script>
