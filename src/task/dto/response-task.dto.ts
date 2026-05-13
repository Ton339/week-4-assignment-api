import { User } from 'src/user/entities/user.entity';

export class ResponseTaskDto {
  id: number;
  title: string;
  status: string;
  priority: string;
  user: User;
}

export class PaginatedTaskResponseDto {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: ResponseTaskDto[];
}
