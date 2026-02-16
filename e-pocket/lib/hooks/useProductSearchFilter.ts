import { useMemo } from 'react';
import { useDebounce } from './useDebouce';

export function useProductSearchFilter(searchQuery: string) {
  const debouncedQuery = useDebounce(searchQuery, 300);
  const filter = useMemo(() => {
    if (!debouncedQuery.trim()) return undefined;
    // Search in name - GROQ match operator
    return `name match "*${debouncedQuery}*"`;
  }, [debouncedQuery]);

  return { filter, isSearching: searchQuery !== debouncedQuery };
}
