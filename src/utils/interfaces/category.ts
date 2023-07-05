import { Pagination } from ".";

interface Category {
  nama: string;
  type: "income" | "expense" | "";
  id?: string;
}

interface ResponCategory {
  count: number;
  pagination: Pagination;
  data: Category;
}

export type { Category, ResponCategory };
