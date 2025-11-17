import { categoriesRepository } from '../repositories/categories/categoriesRepository';
import type {
  CreateCategoryParam,
  EditCategoryParam,
} from '../repositories/categories/categoriesRepository.param';

export const CategoryService = {
  getAllCategories: (
    isActive?: boolean,
    pageNumber: number = 1,
    pageSize: number = 10,
    search?: string,
    orderBys?: string
  ) =>
    categoriesRepository.getAll(
      isActive,
      pageNumber,
      pageSize,
      search,
      orderBys
    ),
  getCategoryById: (id: string | undefined) => categoriesRepository.getById(id),
  createCategory: (data: CreateCategoryParam | FormData) =>
    categoriesRepository.create(data),
  editCategory: ({
    id,
    data,
  }: {
    id: string;
    data: EditCategoryParam | FormData;
  }) => categoriesRepository.edit(id, data),
  deleteCategory: (id: string | undefined) => categoriesRepository.delete(id),
  restoreCategory: (id: string | undefined) => categoriesRepository.restore(id),
};
