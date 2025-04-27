<template>
  <li>
    <RouterLink
      :to="link"
      class="flex gap-2 text-lg items-center border px-4 py-2 text-neutral-700 rounded-md"
      :class="`${
        route.path === link
          ? 'bg-neutral-200 border-neutral-400 cursor-default'
          : 'border-transparent hover:border-neutral-200 hover:bg-neutral-100 cursor-pointer'
      }`"
      @click="$emit('navigated')"
    >
      <BaseSVG :name="icon" custom-classes="w-[18px] h-[18px] fill-neutral-700" />
      <span>{{ label }}</span>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import BaseSVG, { AvailableIcons } from '../utils/BaseSVG.vue';

const route = useRoute();

interface Props {
  link: string;
  icon: AvailableIcons;
  label: string;
}
defineProps<Props>();
defineEmits(['navigated']);
</script>
