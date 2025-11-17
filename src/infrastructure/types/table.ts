import type { QueryClient } from '@tanstack/react-query';

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export interface Callback {
  edit?: (id: string) => void;
  delete?: (id: string) => void;
  restore?: (id: string) => void;
  view?: (id: string) => void;
}

export type FilterField = {
  id: string;
  label: string;
  type: 'select' | 'text' | 'date' | 'number' | 'multi-select' | 'num-range';
  options?: { label: string; value: string | number | boolean | null }[];
  minMax?: [number, number];
};

export type FilterComponentProps = {
  title?: string;
  fields?: FilterField[];
  onChange?: (id: string, value: string | number | boolean | string[]) => void;
};

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface ConfirmationParams {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: (id: string, options?: any) => void;

  queryClient: QueryClient;
  queryKey: string | unknown[];
  successMessage: string;
  actionName: string;
  confirmationMessage?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  icon?: 'question' | 'warning' | 'info' | 'success' | 'error';
}

export interface UseTableOptions<TFilters = unknown> {
  pageSize?: number;
  defaultFilters?: TFilters;
  onChange?: (params: {
    currentPage: number;
    search: string;
    orderBy: string;
    filters: TFilters;
  }) => void;
}

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T, rowIndex?: number) => React.ReactNode);
  width?: string;
  cellClassName?: string;
  sortable?: boolean;
};

export interface TableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onActiveChange?: (active: boolean | undefined) => void;
  search?: string;
  setSearch?: (value: string) => void;
  toggleAddModal?: () => void;
  isLoading: boolean;
  isFilterRequired: boolean;
  filterTitle?: string;
  filterConfig?: FilterField[];
  onFilterChange?: (
    filters: Record<string, string | number | boolean | string[]>
  ) => void;
  onSortChange?: (orderBys: string) => void;
}

export interface SearchInputProps {
  search: string;
  onChange: (value: string) => void;
}
