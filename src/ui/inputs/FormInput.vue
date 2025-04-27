<template>
  <div class="flex flex-col gap-1 w-full relative pb-5 mt-2">
    <div class="relative w-full flex flex-col gap-1">
      <span class="text-md text-neutral-700 font-semibold">{{ label }}</span>
      <input
        ref="input"
        class="w-full text-[14px] text-neutral-700 focus:border-blue-500 outline-none h-8 px-3 py-[5px] border border-gray-700 rounded-md focus:inset-shadow-blue-inner"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="localInputValues.text"
        @input="localInputValues.text = ($event.target as HTMLInputElement).value"
        @focus="handleFocus"
        @focusout="handleFocusOut"
        @keydown.enter="$emit('enter')"
      />
    </div>
    <span class="absolute bottom-0 right-0 left-0 block text-[12px] text-red-500">{{
      localInputValues.error
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { InputValues } from '@/types/form-validators';

interface InputProps {
  inputValues: InputValues;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  required: true,
  type: 'text',
});

const emit = defineEmits(['update:inputValues', 'enter']);
const localInputValues = ref<InputValues>(props.inputValues);

watch(
  () => localInputValues,
  newValue => {
    emit('update:inputValues', newValue);
  },
  { deep: true }
);

const input = ref<HTMLInputElement>();

function handleFocus() {
  localInputValues.value.error = '';
}

function handleFocusOut() {
  localInputValues.value.validate();
}

defineExpose({
  focus: () => input.value?.focus(),
});
</script>
