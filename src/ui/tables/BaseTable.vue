<template>
  <table class="w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
    <thead>
      <tr>
        <th
          class="bg-blue-200 py-2 px-3 text-left"
          v-for="header in headers"
          :key="header.itemKey"
          :style="{ width: header.width ? header.width + 'px' : 'auto' }"
          :class="{
            'rounded-tl-lg': headers.indexOf(header) === 0,
            'rounded-tr-lg': headers.indexOf(header) === headers.length - 1,
          }"
        >
          <slot :item="header" :name="`header-${header.itemKey}`">
            <span class="text-md text-neutral-700 font-semibold">
              {{ header.text }}
            </span>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="items.length === 0">
        <tr>
          <td :colspan="headers.length" class="py-2 px-3 text-center bg-neutral-200 rounded-b-lg">
            <slot name="empty">
              <span class="text-neutral-600 font-md font-semibold my-2"> Sin resultados </span>
            </slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(item, item_index) in items" :key="`item-${item_index}`">
          <td
            class="py-2 px-3 text-left text-sm"
            :class="`
              ${item_index % 2 === 0 ? 'bg-neutral-200' : 'bg-neutral-100'}
              ${item_index === items.length - 1 && header_index === 0 ? 'rounded-bl-lg' : ''}
              ${item_index === items.length - 1 && header_index === headers.length - 1 ? 'rounded-br-lg' : ''}
            `"
            v-for="(header, header_index) in headers"
            :key="`header-${header_index}`"
          >
            <slot :name="`item-${header.itemKey}`" :item="item">
              <span class="text-neutral-700">
                {{ getItemValue(header, item) }}
              </span>
            </slot>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
export type TableHeader = {
  itemKey: string;
  text: string;
  width?: number;
};

export type TableItem = {
  [key: string]: any;
};

export interface TableProps {
  headers: TableHeader[];
  items: TableItem[];
}

defineProps<TableProps>();
function getItemValue(header: TableHeader, item: TableItem) {
  const paths = header.itemKey.split('.');
  if (paths.length === 1) {
    return item[paths[0]] ?? '';
  }
  let itemValue: TableItem | null = null;
  for (const path of paths) {
    itemValue = itemValue === null ? item[path] : itemValue[path];
  }
  return itemValue ?? '';
}
</script>
