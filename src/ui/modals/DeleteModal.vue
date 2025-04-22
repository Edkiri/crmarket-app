<template>
  <Transition
    enter-active-class="transition-opacity duration-400"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="absolute inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        ref="modalRef"
        class="flex flex-col gap-[20px] z-[1000] bg-neutral-200 p-[40px] border border-neutral-600 shadow-lg rounded-md"
      >
        <h3 class="text-black text-center max-w-80">
          {{ message }}
        </h3>
        <div class="flex justify-between gap-12">
          <BaseButton
            custom-classes="bg-neutral-300 hover:bg-neutral-400 text-neutral-700"
            @click="cancelModal()"
            label="Cancelar"
          />
          <BaseButton
            custom-classes="bg-red-400 hover:bg-red-600 border border-ref-600 text-neutral-200 font-semibold"
            @click="confirmModal()"
            label="Eliminar"
            icon="Delete"
            icon-clases="w-[18px] h-[18px] fill-neutral-200"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useClickOutside } from '@/composables/use-click-outside';
import BaseButton from '@/ui/buttons/BaseButton.vue';

interface ModalProps {
  message: string;
}
const emit = defineEmits(['cancel', 'comfirm']);
defineProps<ModalProps>();

const isOpen = ref(true);
const modalRef = ref<HTMLElement | null>(null);

function cancelModal() {
  isOpen.value = false;
  emit('cancel');
}

function confirmModal() {
  isOpen.value = false;
  emit('comfirm');
}

useClickOutside(modalRef, () => {
  cancelModal();
});
</script>
