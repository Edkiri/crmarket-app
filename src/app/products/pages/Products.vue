<template>
  <ProductHeader
    @search="searchProducts()"
    @open-create-modal="showCreateModal = true"
    :loading="loadingProducts"
  />

  <Loading class="mt-4" v-if="loadingProducts" />
  <div v-else>
    <Pagination
      class="mt-4"
      v-model:current-page="pagination.currentPage"
      :pagination="pagination"
    />

    <ProductTable class="mt-2" :products="products" @select="handleSelectProduct" />
  </div>

  <ProductCreateModal
    v-if="showCreateModal"
    @close="showCreateModal = false"
    @created="searchProducts()"
  />

  <ProductUpdateModal
    v-if="showUpdateModal && selectedProduct"
    @close="closeUpdateModal()"
    @update="handleUpdated()"
    @delete="handleDelete()"
    :product="selectedProduct"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useStore from '@/composables/use-store';
import ProductTable from '@/app/products/components/ProductTable.vue';
import ProductCreateModal from '@/app/products/components/ProductCreateModal.vue';
import ProductHeader from '@/app/products/components/ProductHeader.vue';
import ProductUpdateModal from '@/app/products/components/ProductUpdateModal.vue';
import { Product } from '../types';
import Pagination from '@/ui/pagination/Pagination.vue';
import Loading from '@/ui/icons/Loading.vue';

const selectedProduct = ref<Product | null>(null);
const showCreateModal = ref(false);
const showUpdateModal = ref(false);

const productsStore = useStore('products');
const { searchProducts, refreshCurrentPage, changePage } = productsStore;
const { products, pagination, loadingProducts } = storeToRefs(productsStore);

const categoriesStore = useStore('categories');

onMounted(() => {
  categoriesStore.fetchCategories();
  if (!pagination.value.currentQuery) {
    searchProducts();
  } else {
    refreshCurrentPage();
  }
});

watch(
  () => pagination.value.currentPage,
  newPage => {
    changePage(newPage);
  }
);

function handleSelectProduct(product: Product) {
  selectedProduct.value = product;
  showUpdateModal.value = true;
}

function closeUpdateModal() {
  selectedProduct.value = null;
}

function handleUpdated() {
  refreshCurrentPage();
}

function handleDelete() {
  refreshCurrentPage();
}
</script>
