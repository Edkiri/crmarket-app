<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useStore from './composables/use-store';
import BaseSVG from './ui/utils/BaseSVG.vue';
import { ref } from 'vue';
import AppMenu from './ui/components/AppMenu.vue';
import { useToastStore } from './app/toasts/toasts-store';
import ToastList from './ui/toasts/ToastList.vue';

const auth = useStore('auth');
const { isAuthenticated } = storeToRefs(auth);

const isMenuOpen = ref(false);

useToastStore();
</script>

<template>
  <header class="h-[64px] flex items-center bg-blue-200 border-b border-[#454c54]">
    <div class="w-full px-8 m-auto flex justify-between items-center">
      <div class="flex items-center gap-2">
        <button
          v-if="isAuthenticated"
          @click="isMenuOpen = true"
          type="button"
          class="p-2 rounded-full hover:bg-neutral-200 cursor-pointer"
        >
          <BaseSVG name="Menu" custom-classes="fill-neutral-800 w-[25px] h-[25px]" />
        </button>
        <h1 class="text-md font-bold text-neutral-800">CRMarket</h1>
      </div>

      <button
        v-if="isAuthenticated"
        @click="auth.logout()"
        class="bg-red-400 text-sm py-[2px] px-4 rounded-md text-white font-bold"
      >
        Salir
      </button>
    </div>
  </header>

  <AppMenu :is-open="isMenuOpen" :close-menu="() => (isMenuOpen = false)" />

  <main class="max-w-7xl m-auto p-8">
    <RouterView />
  </main>
  <ToastList />
</template>
