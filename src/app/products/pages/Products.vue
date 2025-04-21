<template>
  <div class="flex justify-between gap-4">
    <form class="flex w-full" @submit.prevent="search()">
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

    <button
      class="cursor-pointer flex gap-2 items-center bg-[#055d20] px-[12px] border-[1px] border-[#013d14] rounded-md h-[32px]"
      @click="showCreateModal = true"
    >
      <Inventory class="w-[20px] h-[20px] fill-neutral-200" />
      <span class="text-[14px] text-neutral-200">Nuevo</span>
    </button>
  </div>

  <ProductTable :products="products" />
  <ProductCreateModal v-if="showCreateModal" @close="showCreateModal = false" @created="search()" />
</template>

<script setup lang="ts">
import Search from '@/ui/icons/Search.vue';
import { onMounted, ref } from 'vue';
import useQueryProducts from '../composables/useQueryProducts';
import useStore from '@/composables/use-store';
import { storeToRefs } from 'pinia';
import Inventory from '@/ui/icons/Inventory.vue';
import ProductTable from '../components/ProductTable.vue';
import ProductCreateModal from '../components/ProductCreateModal.vue';

const { products, query } = storeToRefs(useStore('products'));
const categoriesStore = useStore('categories');

onMounted(() => {
  search();
  categoriesStore.fetchCategories();
});

const showCreateModal = ref(false);

async function search() {
  products.value = await useQueryProducts(query.value);
}
</script>
