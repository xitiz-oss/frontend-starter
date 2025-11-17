import type {
  CreateCategoryParam,
  EditCategoryParam,
} from './categoriesRepository.param';
import { BaseRepository } from '../base/baseRepository';

export class CategoriesRepository extends BaseRepository<
  CreateCategoryParam,
  EditCategoryParam
> {
  constructor() {
    super('category');
  }

}

export const categoriesRepository = new CategoriesRepository();
