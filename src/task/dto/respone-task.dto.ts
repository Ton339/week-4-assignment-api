export class ResponeTaskDto {
  id: number;
  title: string;
  status: string;
  priority: string;
  userId: number;
}

export class PaginatedTaskResponseDto {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: ResponeTaskDto[];
}
