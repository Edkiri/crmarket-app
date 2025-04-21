<template>
  <ProductHeader @search="search()" @open-create-modal="showCreateModal = true" />

  <ProductTable :products="products" />

  <ProductCreateModal v-if="showCreateModal" @close="showCreateModal = false" @created="search()" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useQueryProducts from '@/app/products/composables/useQueryProducts';
import useStore from '@/composables/use-store';
import ProductTable from '@/app/products/components/ProductTable.vue';
import ProductCreateModal from '@/app/products/components/ProductCreateModal.vue';
import ProductHeader from '@/app/products/components/ProductHeader.vue';

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
