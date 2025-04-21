<template>
  <div class="flex justify-between gap-4">
    <form class="flex w-full" @submit.prevent="$emit('openCreateModal')">
      <div class="grow">
        <input
          class="w-full text-[14px] text-gray-400 focus:border-blue-500 outline-none h-8 px-3 py-[5px] border border-gray-700 rounded-l-md focus:inset-shadow-blue-inner"
          type="text"
          placeholder="Buscar productos..."
          v-model="query.name"
        />
      </div>

      <button
        class="cursor-pointer w-8 h-8 flex justify-center items-center border border-l-0 border-gray-700 rounded-r-md bg-blue-200"
        type="button"
        @click="$emit('search')"
      >
        <Search class="w-[16px] h-[16px] fill-neutral-700" />
      </button>
    </form>

    <BaseButton
      @click="$emit('openCreateModal')"
      label="Nuevo"
      custom-classes="bg-[#055d20] px-[12px] border-[1px] border-[#013d14] hover:bg-[#087f3e]"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useStore from '@/composables/use-store';
import Search from '@/ui/icons/Search.vue';
import BaseButton from '@/ui/buttons/BaseButton.vue';

defineEmits(['search', 'openCreateModal']);

const { query } = storeToRefs(useStore('products'));
</script>
