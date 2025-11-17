import type { TableProps } from '@/infrastructure/types/table';
import { useState, type ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  ArrowUpAZ,
  ArrowDownZA,
  ArrowDownUp,
} from 'lucide-react';
import SearchInput from './SearchInput';
import { Spinner } from './SpinLoader';
// import FilterComponent from "./FilterComponent";
import { Button } from '@/components/ui/button';

function DataTable<T extends { id: string | number }>({
  title,
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  onActiveChange,
  search,
  setSearch,
  toggleAddModal,
  isLoading,
  isFilterRequired,
  filterTitle,
  filterConfig,
  onFilterChange,
  onSortChange,
}: TableProps<T>) {
  const [selected, setSelected] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [activeFilters, setActiveFilters] = useState<
    Record<string, string | number | boolean | string[]>
  >({});

  const handleChange = (index: number) => {
    setSelected(index);
    if (index === 0) onActiveChange?.(undefined);
    else if (index === 1) onActiveChange?.(true);
    else if (index === 2) onActiveChange?.(false);
  };

  const handleSort = (accessor: string) => {
    let newOrder: 'asc' | 'desc' = 'asc';

    if (sortColumn === accessor && sortOrder === 'asc') {
      newOrder = 'desc';
    }

    setSortColumn(accessor);
    setSortOrder(newOrder);

    const orderByParam = `${accessor} ${newOrder}`;
    onSortChange?.(orderByParam);
  };

  const handleFilterChange = (
    id: string,
    value: string | number | boolean | string[] | string[]
  ) => {
    // Update active filters and propagate to parent
    const updatedFilters = { ...activeFilters, [id]: value };
    setActiveFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-center items-center space-x-2">
          <span className="text-lg font-semibold">{title}</span>
          <Info className="size-4" />
        </div>

        {/* Search + Add New */}
        <div className="flex items-center space-x-2">
          {/* <Menu selected={selected} onChange={handleChange} />
          {isFilterRequired && (
            <FilterComponent
              title={filterTitle ?? "Filter"}
              fields={filterConfig}
              onChange={handleFilterChange}
            />
          )} */}

          <SearchInput
            search={search || ''}
            onChange={(val: string) => {
              setSearch?.(val);
              // onPageChange?.(1);
            }}
          />

          <Button
            onClick={toggleAddModal}
            // variant={"roundedDefault"}
            // className="px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
          >
            Add New
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="w-full rounded-md border no-scrollbar overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className="px-4 py-2 text-primary font-bold text-base select-none"
                  onClick={() =>
                    col.sortable && handleSort(col.accessor as string)
                  }
                >
                  <div
                    className={`flex-align-center ${
                      col.sortable
                        ? 'cursor-pointer hover:bg-gray-50 rounded-md px-1'
                        : ''
                    }`}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <>
                        {sortColumn === col.accessor ? (
                          sortOrder === 'asc' ? (
                            <ArrowUpAZ className="size-4 text-primary" />
                          ) : (
                            <ArrowDownZA className="size-4 text-primary" />
                          )
                        ) : (
                          <ArrowDownUp className="size-4 text-gray-400" />
                        )}
                      </>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  <Spinner size="small">Loading...</Spinner>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.length > 0 ? (
                  data.map((row: T, rowIndex: number) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    >
                      {columns.map((col, colIdx) => {
                        const value: ReactNode =
                          typeof col.accessor === 'function'
                            ? col.accessor(row, rowIndex)
                            : (row[col.accessor] as unknown as ReactNode);

                        return (
                          <TableCell
                            key={colIdx}
                            className={`py-2 px-4 ${col.cellClassName || ''}`}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-6 text-gray-500"
                    >
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages && (
        <div className="max-w-[30%] mx-auto">
          <div className="mt-8 flex-align-center ">
            <button
              onClick={() =>
                onPageChange?.(Math.max((currentPage ?? 1) - 1, 1))
              }
              disabled={currentPage === 1}
              className="p-1 border rounded-full disabled:opacity-50"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                onPageChange?.(
                  Math.min((currentPage ?? 1) + 1, totalPages ?? 1)
                )
              }
              disabled={currentPage === totalPages}
              className="p-1 border rounded-full bg-primary text-white disabled:opacity-60"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
