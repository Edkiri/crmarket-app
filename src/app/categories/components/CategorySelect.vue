<template>
  <div ref="categorySelectContainer" class="relative h-full">
    <button
      @click="handleOpen()"
      type="button"
      class="relative cursor-pointer w-full text-[14px] overflow-x-hidden text-neutral-700 focus:border-blue-500 outline-none h-10 border border-gray-700 rounded-md"
    >
      <p v-if="!currentCategories.length" class="h-full flex items-center pl-2 text-neutral-400">
        Categorías...
      </p>
      <div v-else class="flex items-center gap-2 px-2 h-full overflow-x-scroll mr-8">
        <button
          @click.stop=""
          type="button"
          class="text-sm rounded-md p-[1px] px-2 bg-neutral-300 flex items-center gap-[4x] min-w-fit"
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

    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="open"
        class="px-4 pb-4 absolute left-0 right-0 top-10 border border-neutral-700 rounded-md bg-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-100"
      >
        <div class="py-2">
          <FormInput
            ref="searchInput"
            :input-values="searchCategoryName"
            placeholder="Buscar categorías..."
            @enter="handleSearchKeydownEnter"
          />
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            :disabled="currentCategories.some((item: Category) => item.id === category.id)"
            class="text-sm rounded-md p-[1px] px-2 min-w-fit"
            :class="`${currentCategories.some((item: Category) => item.id === category.id) ? 'bg-neutral-400' : 'cursor-pointer bg-neutral-200 hover:bg-neutral-300'}`"
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
const currentCategories = ref<Category[]>([...props.selected]);

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

function handleSearchKeydownEnter() {
  if (filteredCategories.value.length === 1) {
    addCategory(filteredCategories.value[0]);
  }
}
</script>
