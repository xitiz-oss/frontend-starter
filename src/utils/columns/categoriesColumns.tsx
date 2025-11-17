import type { Category } from '../../infrastructure/types/category';
import type { Callback } from '@/infrastructure/types/table';
import { Edit, Trash2, ArchiveRestore, Eye } from 'lucide-react';
import parse from 'html-react-parser';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const categoryTableColumns = (
  startIndex: number,
  callbacks: Callback
) => [
  {
    header: 'S.N.',
    accessor: (_: Category, idx?: number) => (
      <>{idx !== undefined ? startIndex + idx + 1 : 0}</>
    ),
  },

  { header: 'Category', accessor: 'title', sortable: true },
  {
    header: 'Description',
    accessor: (row: Category) => (
      <span className="line-clamp-1">{parse(row.description)}</span>
    ),
    cellClassName: 'max-w-[40vw]',
  },
  {
    header: 'Status',
    accessor: (row: Category) =>
      row.isActive ? (
        <span className="text-green-600 bg-green-100 py-1 px-4 rounded-full">
          Active
        </span>
      ) : (
        <span className="text-red-600 bg-red-100 py-1 px-4 rounded-full">
          Inactive
        </span>
      ),
  },
  {
    header: 'Actions',
    accessor: (row: Category) => (
      <div className="flex space-x-4">
        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => callbacks?.view?.(row.id)}>
              <Eye className="size-5 text-primary" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View Category</p>
          </TooltipContent>
        </Tooltip>

        {row.isActive ? (
          <>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={() => callbacks?.edit?.(row.id)}>
                  <Edit className="size-5 text-primary" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Category</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={() => callbacks?.delete?.(row.id)}>
                  <Trash2 className="size-5 text-primary" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Category</p>
              </TooltipContent>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={() => callbacks?.restore?.(row.id)}>
                  <ArchiveRestore className="size-5 text-primary" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restore Category</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    ),
  },
];
