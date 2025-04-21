<template>
  <component :is="DynamicIcon" v-if="!loadError" :class="customClasses" :style="iconStyle" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';

interface SvgIconProps {
  name: 'Inventory' | 'Search';
  size?: string;
  customClasses?: string;
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  size: '20px',
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

const iconStyle = computed(() => {
  return {
    width: props.size,
    height: props.size,
  };
});
</script>
