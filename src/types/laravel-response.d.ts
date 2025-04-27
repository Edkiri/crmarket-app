export interface PaginatedResponse<T = undefined> {
  data: T[];
  meta: {
    total: number;
  };
  links: {
    prev: string | null;
    next: string | null;
  };
}
