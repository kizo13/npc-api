class PaginatedDto {
  data: unknown[];
  page: number;
  limit: number;
  totalCount: number;
}

export default PaginatedDto;
