<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useStore from './composables/use-store';

const auth = useStore('auth');
const { isAuthenticated } = storeToRefs(auth);
</script>

<template>
  <header class="h-[64px] flex items-center justify-between px-2 md:px-4 bg-blue-200 border-b border-[#454c54]">
    <h1 class="text-md font-bold">CRMarket</h1>
    <button
      v-if="isAuthenticated"
      @click="auth.logout()"
      class="bg-red-400 text-sm py-[2px] px-4 rounded-md text-white font-bold"
    >
      Salir
    </button>
  </header>
  <main class="max-w-7xl m-auto p-8">
    <RouterView />
  </main>
</template>
