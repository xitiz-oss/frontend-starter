export interface CreateCategoryParam {
  title: string;
  description: string;
}

export interface EditCategoryParam {
  id: string | undefined;
  title: string;
  description: string;
}
