<template>
  <div class="flex items-center justify-between">
    <div v-if="pagination.total > 0" class="text-sm text-gray-700 flex gap-1">
      Mostrando
      <span class="font-medium">{{ startItem }}</span>
      a
      <span class="font-medium">{{ endItem }}</span>
      de
      <span class="font-medium">{{ pagination.total }}</span>
      resultados
    </div>
    <span v-else> 0 resultados </span>

    <div class="flex items-center space-x-1">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="!pagination.prev"
        :class="[
          'px-2 py-1 rounded-md border text-sm',
          pagination.prev
            ? 'border-gray-300 bg-white hover:bg-gray-200 text-gray-700 cursor-pointer'
            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
        ]"
      >
        &laquo;
      </button>

      <div class="flex space-x-1">
        <button
          v-for="page in visiblePageNumbers"
          :key="page"
          @click="goToPage(page as number)"
          :class="[
            'px-3 py-1 rounded-md border text-sm',
            page === currentPage
              ? 'border-blue-500 bg-blue-50 text-blue-600 font-medium'
              : 'border-gray-300 bg-white hover:bg-gray-200 text-gray-700 cursor-pointer',
          ]"
        >
          <span v-if="page !== '...'">{{ page }}</span>
          <span v-else class="px-1">{{ page }}</span>
        </button>
      </div>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="!pagination.next"
        :class="[
          'px-2 py-1 rounded-md border text-sm',
          pagination.next
            ? 'border-gray-300 bg-white hover:bg-gray-200 text-gray-700 cursor-pointer'
            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
        ]"
      >
        &raquo;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Pagination } from '@/composables/use-pagination';

interface Props {
  pagination: Pagination<any>;
  currentPage: number;
  maxVisiblePages?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:currentPage']);

const maxVisiblePages = props.maxVisiblePages || 8;

const startItem = computed(() => {
  return (props.currentPage - 1) * props.pagination.perPage + 1;
});

const endItem = computed(() => {
  const end = props.currentPage * props.pagination.perPage;
  return end > props.pagination.total ? props.pagination.total : end;
});

const totalPages = computed(() => {
  return Math.ceil(props.pagination.total / props.pagination.perPage);
});

const visiblePageNumbers = computed(() => {
  if (totalPages.value <= maxVisiblePages) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  const earlyPagesThreshold = 4;

  if (props.currentPage <= earlyPagesThreshold) {
    for (let i = 1; i <= 5; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages.value);
  } else if (props.currentPage >= totalPages.value - 3) {
    pages.push(1);
    pages.push('...');
    for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push('...');
    for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages.value);
  }

  return pages;
});

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
  }
}
</script>
