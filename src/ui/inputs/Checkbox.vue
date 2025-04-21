<template>
  <div class="flex items-center">
    <input
      id="is-active"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <label v-if="label" for="is-active" class="ml-2 text-sm text-gray-700">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
interface CheckboxProps {
  modelValue: boolean;
  label?: string;
}

defineProps<CheckboxProps>();
defineEmits(['update:modelValue']);
</script>
