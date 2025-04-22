<template>
  <ProductHeader @search="search()" @open-create-modal="showCreateModal = true" />

  <ProductTable :products="products" @select="handleSelectProduct" />

  <ProductCreateModal v-if="showCreateModal" @close="showCreateModal = false" @created="search()" />

  <ProductUpdateModal
    v-if="showUpdateModal && selectedProduct"
    @close="closeUpdateModal()"
    @update="handleUpdated()"
    @delete="handleDelete()"
    :product="selectedProduct"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useQueryProducts from '@/app/products/composables/useQueryProducts';
import useStore from '@/composables/use-store';
import ProductTable from '@/app/products/components/ProductTable.vue';
import ProductCreateModal from '@/app/products/components/ProductCreateModal.vue';
import ProductHeader from '@/app/products/components/ProductHeader.vue';
import ProductUpdateModal from '@/app/products/components/ProductUpdateModal.vue';
import { Product } from '../types';

const { products, query, selectedProduct } = storeToRefs(useStore('products'));
const showCreateModal = ref(false);
const showUpdateModal = ref(false);

const categoriesStore = useStore('categories');

onMounted(() => {
  search();
  categoriesStore.fetchCategories();
});

async function search() {
  products.value = await useQueryProducts(query.value);
}
function handleSelectProduct(product: Product) {
  selectedProduct.value = product;
  showUpdateModal.value = true;
}

function closeUpdateModal() {
  showUpdateModal.value = false;
  selectedProduct.value = null;
}

function handleUpdated() {
  closeUpdateModal();
  search();
}

function handleDelete() {
  closeUpdateModal();
  search();
}
</script>
