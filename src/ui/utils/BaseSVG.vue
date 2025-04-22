<template>
  <component :is="DynamicIcon" v-if="!loadError" :class="customClasses" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';

export type AvailableIcons = 'Inventory' | 'Search' | 'Save' | 'Delete' | 'ArrowDown';

interface SvgIconProps {
  name: AvailableIcons;
  size?: string;
  customClasses?: string;
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  customClasses: '',
});

const loadError = ref(false);

const DynamicIcon = computed(() => {
  loadError.value = false;

  return defineAsyncComponent({
    loader: () => {
      return import(`../icons/${props.name}.vue`).catch(error => {
        console.error(`No se pudo cargar el icono: ${props.name}`, error);
        loadError.value = true;
        return { render: () => null };
      });
    },
  });
});
</script>
