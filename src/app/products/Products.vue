<template>
  <div class="flex">
    <div class="grow">
      <input
        class="w-full text-[14px] text-gray-400 focus:border-blue-500 outline-none h-8 px-3 py-[5px] border border-gray-700 rounded-l-md focus:inset-shadow-blue-inner"
        type="text"
        placeholder="Buscar productos..."
      />
    </div>

    <div
      class="w-8 h-8 flex justify-center items-center border border-l-0 border-gray-700 rounded-r-md bg-blue-200"
    >
      <Search class="w-[16px] h-[16px] fill-neutral-700" />
    </div>
  </div>

  <BaseTable class="mt-8" :headers="headers" :items="products"></BaseTable>
</template>

<script setup lang="ts">
import useAxios from '@/composables/use-axios';
import Search from '@/ui/icons/Search.vue';
import BaseTable, { TableHeader } from '@/ui/tables/BaseTable.vue';
import { onMounted, ref } from 'vue';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  reference: string;
  is_active: boolean;
  stock?: number;
  cost_price?: number;
  sale_price?: number;
  brand?: string;
  description?: string;
  categories: Category[];
}

const headers = ref<TableHeader[]>([
  { text: 'Nombre', itemKey: 'name' },
  { text: 'Referencia', itemKey: 'reference' },
  { text: 'Estado', itemKey: 'is_active' },
  { text: 'Stock', itemKey: 'stock' },
  { text: 'Precio coste', itemKey: 'cost_price' },
  { text: 'Precio venta', itemKey: 'sale_price' },
]);

const products = ref<Product[]>([]);

async function findProducts() {
  const { fetchApi } = useAxios();
  const response = await fetchApi<{ data: Product[] }>({ path: 'products' });
  if (response?.status === 200 && response.data?.data) {
    products.value = response.data?.data;
  }
}

onMounted(() => {
  findProducts();
});
</script>
