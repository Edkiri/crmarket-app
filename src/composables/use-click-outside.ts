import { onMounted, onBeforeUnmount, Ref } from 'vue';

export function useClickOutside(targetElement: Ref<HTMLElement | null>, callback: () => void) {
  function handleClick(event: MouseEvent) {
    if (targetElement.value && !targetElement.value.contains(event.target as Node)) {
      callback();
    }
  }

  onMounted(() => document.addEventListener('mousedown', handleClick));
  onBeforeUnmount(() => document.removeEventListener('mousedown', handleClick));
}
