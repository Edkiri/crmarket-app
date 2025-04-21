<template>
  <button :class="buttonClasses" @click="$emit('click', $event)" :disabled="disabled" :type="type">
    <BaseSVG :custom-classes="iconClases" name="Inventory" />
    <span class="text-[14px] text-neutral-200">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseSVG from '../utils/BaseSVG.vue';

interface BaseButtonInterface {
  label?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  customClasses?: string;
  icon?: string;
  iconClases?: string;
}

const props = withDefaults(defineProps<BaseButtonInterface>(), {
  disabled: false,
  type: 'button',
  customClasses: '',
  iconClases: 'w-[20px] h-[20px] fill-neutral-200',
});

defineEmits(['click']);

const buttonClasses = computed(() => {
  return [
    'h-[32px] flex gap-2 items-center rounded-md transition-colors duration-200',
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    props.customClasses,
  ].join(' ');
});
</script>
