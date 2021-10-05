class PaginatedDto<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}

export default PaginatedDto;
