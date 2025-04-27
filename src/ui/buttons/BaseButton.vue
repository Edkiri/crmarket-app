<template>
  <button :class="buttonClasses" @click="$emit('click', $event)" :disabled="disabled" :type="type">
    <BaseSVG v-if="icon" :custom-classes="iconClases" :name="icon" />
    <span class="text-[14px]">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseSVG, { AvailableIcons } from '../utils/BaseSVG.vue';

interface BaseButtonInterface {
  label?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  customClasses?: string;
  icon?: AvailableIcons;
  iconClases?: string;
}

const props = withDefaults(defineProps<BaseButtonInterface>(), {
  disabled: false,
  type: 'button',
  customClasses: '',
  iconClases: 'w-[18px] h-[18px] fill-neutral-200',
});

defineEmits(['click']);

const buttonClasses = computed(() => {
  return [
    'flex py-1 gap-2 items-center rounded-md transition-colors duration-200 px-[12px]',
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    props.customClasses,
  ].join(' ');
});
</script>
