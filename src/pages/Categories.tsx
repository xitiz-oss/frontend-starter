import { useGetAllCategories } from '@/infrastructure/queries/categories.query';
import type { Category } from '@/infrastructure/types/category';
import type { Column } from '@/infrastructure/types/table';
import { categoryTableColumns } from '@/utils/columns/categoriesColumns';
// import useModal from "@/hooks/useModal";
// import { queryClient } from "@/lib/clients/queryClient";
// import { QUERY_CATEGORIES_KEY } from "@/constants/query.constant";
// import { Spinner } from "@/components/ui/SpinLoader";
// import { confirmAndMutate } from "@/utils/adminHelpers/confirmationUtil";
import useTable from '@/hooks/useTable';
import DataTable from '@/components/ui/custom/DataTable';
import useModal from '@/hooks/useModal';

const Categories = () => {
  const {
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    orderBy,
    setOrderBy,
    filters,
    setFilters,
  } = useTable<{ isActive?: boolean }>({
    pageSize: 10,
    defaultFilters: { isActive: undefined },
  });

  const [isAddModalOpen, toggleAddModal] = useModal();
  //   const [isViewModalOpen, toggleViewModal] = useModal();
  //   const [isEditModalOpen, toggleEditModal] = useModal();
  //   const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
  //     null
  //   );
  //   const [viewCategoryId, setViewCategoryId] = useState<string | null>(null);

  const categoriesPerPage = 10;

  const { data, isLoading } = useGetAllCategories(
    filters.isActive,
    currentPage,
    categoriesPerPage,
    search,
    orderBy
  );

  const totalPages = data?.totalPages ?? 1;
  const categories = data?.result ?? [];

  const callbacks = {
    view: (id: string) => {
      //   setViewCategoryId(id);
      //   toggleViewModal();
    },
    edit: (id: string) => {
      //   setEditingCategoryId(id);
      //   toggleEditModal();
    },
  };

  return (
    <div className="p-10">
      <div className="min-h-[30vh]">
        {/* Table */}
        <DataTable<Category>
          title="Available Categories"
          data={categories}
          columns={
            categoryTableColumns(
              (currentPage - 1) * categoriesPerPage,
              callbacks
            ) as Column<Category>[]
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          toggleAddModal={toggleAddModal}
          isFilterRequired={false}
          onSortChange={setOrderBy}
        />
      </div>
    </div>
  );
};

export default Categories;
