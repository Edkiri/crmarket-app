<template>
  <BaseTable class="mt-4" :headers="headers" :items="categories">
    <template #item-name="{ item }">
      <button
        @click="$emit('select', item as Category)"
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
import { Category } from '../types';

interface Props {
  categories: Category[];
}

defineProps<Props>();
defineEmits<{
  (e: 'select', category: Category): void;
}>();

const headers = ref<TableHeader[]>([{ text: 'Nombre', itemKey: 'name' }]);
</script>
