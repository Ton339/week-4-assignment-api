import { IsOptional, IsInt, Min } from 'class-validator';

export class PaginationTaskDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  _page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  _per_page?: number;
}
