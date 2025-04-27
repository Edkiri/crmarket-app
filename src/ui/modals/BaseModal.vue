<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="localIsOpen" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div ref="modalRef" class="bg-white shadow-lg rounded-md">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useClickOutside } from '@/composables/use-click-outside';

const emit = defineEmits(['close']);

const localIsOpen = ref(false);
const modalRef = ref<HTMLElement | null>(null);

onMounted(() => (localIsOpen.value = true));

function closeModal() {
  localIsOpen.value = false;
  setTimeout(() => {
    emit('close');
  }, 300);
}

useClickOutside(modalRef, () => {
  closeModal();
});

defineExpose({
  close: closeModal,
});
</script>
