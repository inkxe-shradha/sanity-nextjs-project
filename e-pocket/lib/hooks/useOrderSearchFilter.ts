import { useMemo } from 'react';
import { useDebounce } from './useDebouce';

export function useOrderSearchFilter(searchQuery: string) {
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filter = useMemo(() => {
    if (!debouncedQuery.trim()) return undefined;
    // Search in orderNumber and email
    return `orderNumber match "*${debouncedQuery}*" || email match "*${debouncedQuery}*"`;
  }, [debouncedQuery]);

  return { filter, isSearching: searchQuery !== debouncedQuery };
}
