<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useToastStore, type ToastType } from '@/app/toasts/toasts-store';
import BaseSVG from '../utils/BaseSVG.vue';
const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);

function toastClasses(type: ToastType) {
  return {
    'border-blue-500/50 bg-blue-500/30': type === 'info',
    'border-green-500/50 bg-green-500/30': type === 'success',
    'border-red-500/50 bg-red-500/30': type === 'error',
  };
}

function getIcon(type: ToastType) {
  switch (type) {
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
    default:
      return 'Error';
  }
}

function getIconClasses(type: ToastType) {
  let classes = 'w-[20px] h-[20px]';
  switch (type) {
    case 'success':
      classes += ' fill-green-500/70';
      break;
    case 'error':
      classes += ' fill-red-500/70';
      break;
  }
  return classes;
}
</script>

<template>
  <div class="absolute bottom-4 right-4 space-y-4 justify-stretch z-50">
    <transition-group class="flex flex-col gap-4" name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="rounded w-[280px] shadow-xl flex flex-col items-center cursor-pointer"
        @click="toastStore.removeToast(toast.id)"
      >
        <div
          class="flex gap-1 items-center p-1 px-2 w-full border-2 rounded-md"
          :class="toastClasses(toast.type)"
        >
          <BaseSVG :custom-classes="getIconClasses(toast.type)" :name="getIcon(toast.type)" />
          <p class="text-sm w-full text-neutral-600 font-semibold">
            {{ toast.message }}
          </p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(50px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
