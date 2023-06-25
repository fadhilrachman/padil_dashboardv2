interface QueryFilter {
  search?: string;
  limit?: number | "";
  page?: number | "";
}

interface Pagination {
  current_page: number;
  next: number;
  previouse: number;
  total_page: number;
  limit: number;
}
interface ResponApi<DATA> {
  count?: number;
  pagination?: Pagination;
  data?: DATA;
}

export type { QueryFilter, ResponApi, Pagination };
