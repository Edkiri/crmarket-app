import { Category } from '../categories/types';
import { ProductQueryForm } from './stores/products-store';
import { ProductQuery } from './types';

const FILTER_REGEX = /(\w+)\s*:\s*(?:"([^"]+)"|(\S+))/g;

export function parseQuery(formQuery: ProductQueryForm): ProductQuery {
  const { searchValue } = formQuery;
  const query: ProductQuery = { page: 1 };

  if (formQuery.categories.length) {
    query.category_ids = formQuery.categories.map((item: Category) => item.id);
  }

  const trimmed = searchValue.trim();

  const prefixMap: Record<string, keyof ProductQuery> = {
    r: 'reference',
    n: 'name',
    b: 'brand',
  };

  const filters = trimmed.match(FILTER_REGEX);

  if (filters) {
    filters.forEach(filter => {
      const [rawPrefix, ...rawRest] = filter.split(':');
      const prefix = rawPrefix.trim();
      const value = rawRest.join(':').trim().replace(/^"|"$/g, '');
      const key = prefixMap[prefix];

      if (!key) return;

      // @ts-ignore relájate que tampoco es pa tanto
      query[key] = value;
    });
  } else {
    query.name = trimmed;
  }

  return query;
}
