<script setup lang="ts">
import AppMenuItem from './AppMenuItem.vue';
import { PagesLinks } from '@/router/types';

interface Props {
  isOpen: boolean;
  closeMenu: () => void;
}

defineProps<Props>();
</script>

<template>
  <div
    class="fixed top-0 left-0 h-full w-64 bg-white rounded-md z-50 transform transition-transform duration-300 ease-in-out shadow-2xl"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="font-bold text-lg text-neutral-800">Menú</h2>
        <button @click="closeMenu()" class="h-[35px] cursor-pointer w-[35px] rounded-full hover:bg-neutral-200">X</button>
      </div>
    </div>

    <nav class="mt-4 px-4">
      <ul class="space-y-2">
        <AppMenuItem icon="Inventory" :link="PagesLinks.inventory" label="Inventario" @navigated="closeMenu()" />
        <AppMenuItem icon="Category" :link="PagesLinks.categories" label="Categorías" @navigated="closeMenu()" />
      </ul>
    </nav>
  </div>
</template>
