import { useQuery, useMutation, keepPreviousData } from '@tanstack/react-query';
import { QUERY_CATEGORIES_KEY } from '../../constants/query.constant';
import { CategoryService } from '../services/categoryService';

export const useGetAllCategories = (
  isActive?: boolean,
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  orderBys?: string
) => {
  return useQuery({
    queryKey: [
      QUERY_CATEGORIES_KEY,
      isActive,
      pageNumber,
      pageSize,
      search,
      orderBys,
    ],
    queryFn: () =>
      CategoryService.getAllCategories(
        isActive,
        pageNumber,
        pageSize,
        search,
        orderBys
      ),
    staleTime: 30 * 60 * 1000,
    ...(orderBys ? { placeholderData: keepPreviousData } : {}),
  });
};

export const useGetCategoryById = (id: string | undefined) => {
  const { data, status, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERY_CATEGORIES_KEY, id],
    queryFn: () => CategoryService.getCategoryById(id),
    staleTime: 30 * 60 * 1000,
  });

  return { data, status, isLoading, isError, error, refetch };
};

export const useCreateCategoryMutation = () =>
  useMutation({
    mutationFn: CategoryService.createCategory,
  });

export const useEditCategoryMutation = () =>
  useMutation({
    mutationFn: CategoryService.editCategory,
  });

export const useDeleteCategoryMutation = () =>
  useMutation({
    mutationFn: CategoryService.deleteCategory,
  });

export const useRestoreCategoryMutation = () =>
  useMutation({
    mutationFn: CategoryService.restoreCategory,
  });
