<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useStore from './composables/use-store';

const auth = useStore('auth');
const { isAuthenticated } = storeToRefs(auth);
</script>

<template>
  <header class="h-[64px] flex items-center bg-blue-200 border-b border-[#454c54]">
    <div class="w-full max-w-7xl px-8 m-auto flex justify-between items-center">
      <h1 class="text-md font-bold">CRMarket</h1>
      <button
        v-if="isAuthenticated"
        @click="auth.logout()"
        class="bg-red-400 text-sm py-[2px] px-4 rounded-md text-white font-bold"
      >
        Salir
      </button>
    </div>
  </header>
  <main class="max-w-7xl m-auto p-8">
    <RouterView />
  </main>
</template>
