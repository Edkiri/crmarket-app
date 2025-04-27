<template>
  <div class="flex justify-between gap-4">
    <div class="flex w-full">
      <div class="grow">
        <input
          class="w-full text-[14px] text-gray-400 focus:border-blue-500 outline-none h-8 px-3 py-[5px] border border-gray-700 rounded-l-md focus:inset-shadow-blue-inner"
          type="text"
          placeholder="Buscar categorías..."
          v-model="searchValue"
        />
      </div>

      <button
        class="w-8 h-8 flex justify-center items-center border border-l-0 border-gray-700 rounded-r-md bg-blue-200"
        type="button"
      >
        <Search class="w-[16px] h-[16px] fill-neutral-700" />
      </button>
    </div>

    <BaseButton
      label="Nueva"
      type="button"
      icon="Category"
      custom-classes="text-neutral-200 bg-[#055d20] border-[1px] border-[#013d14] hover:bg-[#087f3e]"
      @click="showCreateModal = true"
    />
  </div>

  <Loading v-if="loading" />
  <div v-else>
    <CategoryTable :categories="filteredCategories" @select="category => handleSelect(category)" />
  </div>


  <CategoryCreateModal
    v-if="showCreateModal"
    @created="handleCreated()"
    @close="showCreateModal = false"
  />

  <CategoryUpdateModal
    v-if="showUpdateModal && selectedCategory"
    :category="selectedCategory"
    @close="showUpdateModal = false, selectedCategory = null"
    @delete="categoriesStore.fetchCategories()"
    @update="categoriesStore.fetchCategories()"
  />
</template>

<script setup lang="ts">
import useStore from '@/composables/use-store';
import BaseButton from '@/ui/buttons/BaseButton.vue';
import Search from '@/ui/icons/Search.vue';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import CategoryCreateModal from '../components/CategoryCreateModal.vue';
import CategoryTable from '../components/CategoryTable.vue';
import { Category } from '../types';
import CategoryUpdateModal from '../components/CategoryUpdateModal.vue';
import Loading from '@/ui/icons/Loading.vue';

const searchValue = ref('');
const showCreateModal = ref(false);
const showUpdateModal = ref(false);
const selectedCategory = ref<Category | null>(null);

const categoriesStore = useStore('categories');
const { categories, loading } = storeToRefs(categoriesStore);

onMounted(() => categoriesStore.fetchCategories());

const filteredCategories = computed(() => {
  const search = searchValue.value.trim().toLowerCase();
  if (!search) return categories.value;
  return categories.value.filter(category => {
    return category.name.toLowerCase().includes(search);
  });
});

function handleCreated() {
  categoriesStore.fetchCategories();
}

function handleSelect(category: Category) {
  selectedCategory.value = category;
  showUpdateModal.value = true;
}
</script>
