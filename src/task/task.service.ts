import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  PaginatedTaskResponseDto,
  ResponseTaskDto,
} from './dto/response-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedTaskResponseDto> {
    const skip = (page - 1) * limit;

    // ใช้ QueryBuilder แทน เพื่อเลือกระบุเฉพาะฟิลด์ของ User ที่ต้องการ
    const [data, total] = await this.taskRepository
      .createQueryBuilder('task')
      // leftJoin(ชื่อ relation ใน entity, alias name)
      .leftJoin('task.user', 'user')
      // เลือกเฉพาะ id, name, avatar ของ user (ฟิลด์ของ task จะมาครบโดยอัตโนมัติ)
      .addSelect(['user.id', 'user.name', 'user.avatar'])
      .orderBy('task.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      first: 1,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
      last: totalPages,
      pages: totalPages,
      items: total,
      data: data,
    };
  }

  async findOne(id: number): Promise<ResponseTaskDto | null> {
    return await this.taskRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
