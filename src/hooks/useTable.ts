/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseTableOptions } from '@/infrastructure/types/table';
import { useState, useCallback } from 'react';

const useTable = <TFilters extends Record<string, any> = Record<string, any>>({
  pageSize = 10,
  defaultFilters,
  onChange,
}: UseTableOptions<TFilters> = {}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [filters, setFilters] = useState<TFilters>(
    defaultFilters || ({} as TFilters)
  );

  const resetPage = useCallback(() => setCurrentPage(1), []);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      //   resetPage();
      //   onChange?.({
      //     currentPage: 1,
      //     search: value,
      //     orderBy,
      //     filters,
      //   });
    },
    [filters, onChange, orderBy, resetPage]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setOrderBy(value);
      resetPage();
      onChange?.({
        currentPage: 1,
        search,
        orderBy: value,
        filters,
      });
    },
    [filters, onChange, resetPage, search]
  );

  const handleFilterChange = useCallback(
    (newFilters: Partial<TFilters>) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilters } as TFilters;
        onChange?.({
          currentPage: 1,
          search,
          orderBy,
          filters: updated,
        });
        return updated;
      });
      resetPage();
    },
    [onChange, orderBy, resetPage, search]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onChange?.({
        currentPage: page,
        search,
        orderBy,
        filters,
      });
    },
    [filters, onChange, orderBy, search]
  );

  return {
    currentPage,
    pageSize,
    search,
    orderBy,
    filters,
    setCurrentPage: handlePageChange,
    setSearch: handleSearchChange,
    setOrderBy: handleSortChange,
    setFilters: handleFilterChange,
    resetPage,
  };
};

export default useTable;
