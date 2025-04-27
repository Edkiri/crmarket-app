<template>
  <div class="flex justify-between gap-2 items-center">
    <form class="grid grid-cols-2 gap-2 w-full" @submit.prevent="$emit('search')">
      <div class="flex">
        <input
          class="w-full text-[14px] text-gray-400 focus:border-blue-500 outline-none h-10 px-3 py-[5px] border border-gray-700 rounded-md focus:inset-shadow-blue-inner"
          type="text"
          placeholder="Buscar productos..."
          v-model="query.searchValue"
        />
      </div>
      <CategorySelect class="w-full" v-model:selected="query.categories" />
    </form>

    <BaseButton
      @click="$emit('search')"
      label="Buscar"
      type="button"
      icon="Search"
      custom-classes="h-10 bg-blue-600 text-white hover:bg-blue-700"
    />

    <BaseButton
      @click="$emit('openCreateModal')"
      label="Nuevo"
      type="button"
      icon="Inventory"
      custom-classes="h-10 text-neutral-200 bg-[#055d20] border-[1px] border-[#013d14] hover:bg-[#087f3e]"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useStore from '@/composables/use-store';
import BaseButton from '@/ui/buttons/BaseButton.vue';
import CategorySelect from '@/app/categories/components/CategorySelect.vue';

const { query } = storeToRefs(useStore('products'));

interface Props {
  loading: boolean;
}

defineEmits(['search', 'openCreateModal']);
defineProps<Props>();
</script>
