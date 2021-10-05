import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import PaginationOrder from '@shared/enums/pagination-order.enum';

class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  @IsEnum(PaginationOrder, {
    message: `order must be a valid enum value: ${
      PaginationOrder[PaginationOrder.ASC]
    }, ${PaginationOrder[PaginationOrder.DESC]}`,
  })
  order?: PaginationOrder;
}

export default PaginationDto;
