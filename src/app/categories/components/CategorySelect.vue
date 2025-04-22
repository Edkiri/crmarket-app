<template>
  <div ref="categorySelectContainer" class="relative">
    <!-- Botón que alterna la visibilidad -->
    <button
      @click="handleOpen()"
      class="relative cursor-pointer w-full text-[14px] text-neutral-700 focus:border-blue-500 outline-none h-8 border border-gray-700 rounded-md"
    >
      <div class="flex items-center gap-2 px-2">
        <button
          @click.stop=""
          class="text-sm rounded-md p-[1px] px-2 bg-neutral-300 flex items-center gap-[4x]"
          v-for="category in currentCategories"
        >
          <span class="inline-block">{{ category.name }}</span>
          <button
            type="button"
            :disabled="!open"
            @click.stop="removeCategory(category)"
            class="text-sm ml-2 cursor-pointer hover:text-red-500"
            v-if="open"
          >
            x
          </button>
        </button>
      </div>
      <BaseSVG
        name="ArrowDown"
        :custom-classes="
          [
            'absolute right-2 top-1/2 -translate-y-1/2 fill-neutral-700 transition-transform duration-300 ease-in-out w-[18px] h-[18px]',
            open ? 'rotate-0' : 'rotate-[-90deg]',
          ].join(' ')
        "
      />
    </button>

    <!-- Transición Vue con clases Tailwind -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <!-- Sólo se renderiza cuando open === true -->
      <div
        v-if="open"
        class="px-4 pb-4 absolute left-0 right-0 top-10 border border-neutral-700 rounded-md bg-white shadow-lg z-100"
      >
        <div class="py-2">
          <FormInput
            ref="searchInput"
            :input-values="searchCategoryName"
            placeholder="Buscar categorias..."
          />
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            :disabled="currentCategories.some(item => item.id === category.id)"
            class="text-sm rounded-md p-[1px] px-2"
            :class="`${currentCategories.some(item => item.id === category.id) ? 'bg-neutral-400' : 'cursor-pointer bg-neutral-200 hover:bg-neutral-300'}`"
            @click="addCategory(category)"
            v-for="category in filteredCategories"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, Ref, ref } from 'vue';
import { Category } from '../types';
import { storeToRefs } from 'pinia';
import useStore from '@/composables/use-store';
import { useInputValue } from '@/composables/use-input-value';
import FormInput from '@/ui/inputs/FormInput.vue';
import { useClickOutside } from '@/composables/use-click-outside';
import BaseSVG from '@/ui/utils/BaseSVG.vue';

interface Props {
  selected: Category[];
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:selected', value: Category[]): void;
}>();

const searchInput = ref<HTMLInputElement | null>(null);
const categorySelectContainer = ref<HTMLElement | null>(null);

const open = ref(false);
const searchCategoryName = useInputValue('');
const currentCategories = ref<Category[]>(props.selected);

const filteredCategories = computed(() => {
  const search = (searchCategoryName.text as Ref<string>).value.trim().toLowerCase();
  if (!search) return categories.value;
  return categories.value.filter(category => {
    return category.name.toLowerCase().includes(search);
  });
});

const { categories } = storeToRefs(useStore('categories'));

function addCategory(category: Category) {
  if (!currentCategories.value.some(item => item.id === category.id)) {
    currentCategories.value.push(category);
    emit('update:selected', currentCategories.value);
  }
  (searchCategoryName.text as Ref<string>).value = '';
}

function removeCategory(category: Category) {
  currentCategories.value = currentCategories.value.filter(item => item.id !== category.id);
  emit('update:selected', currentCategories.value);
}

async function handleOpen() {
  open.value = !open.value;
  await nextTick();

  if (open.value && searchInput.value) {
    searchInput.value.focus();
  }
}

useClickOutside(categorySelectContainer, () => {
  open.value = false;
});
</script>
