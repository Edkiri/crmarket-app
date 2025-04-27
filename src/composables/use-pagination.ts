import { reactive, UnwrapRef } from 'vue';
import { PaginatedResponse } from '@/types/laravel-response';

export interface Pagination<Q> {
  perPage: number;
  total: number;
  next: boolean;
  prev: boolean;
  currentPage: number;
  currentQuery?: Q;
}

export interface PaginationMethods<T, Q> {
  resetPagination: () => void;
  setPage: (page: number) => void;
  setMetadata: (metadata: PaginatedResponse<T>, query?: Q) => void;
}

export function usePagination<T, Q>(perPage = 15) {
  const pagination = reactive<Pagination<Q>>({
    perPage,
    total: 0,
    next: false,
    prev: false,
    currentPage: 1,
    currentQuery: undefined,
  });

  const paginationMethods: PaginationMethods<T, Q> = {
    resetPagination() {
      pagination.perPage = perPage;
      pagination.total = 0;
      pagination.currentPage = 1;
      pagination.next = false;
      pagination.prev = false;
      pagination.currentQuery = undefined;
    },

    setPage(page: number) {
      pagination.currentPage = page;
    },

    setMetadata(metadata, query) {
      pagination.total = metadata.meta.total;
      pagination.next = metadata.links.next !== null;
      pagination.prev = metadata.links.prev !== null;
      pagination.currentQuery = query as UnwrapRef<Q>;
    },
  };

  return {
    pagination,
    paginationMethods,
  };
}
