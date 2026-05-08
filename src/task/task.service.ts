import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponeTaskDto } from './dto/respone-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ResponeTaskDto> {
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.taskRepository.findAndCount({
      skip,
      take: limit,
      order: {
        id: 'ASC',
      },
    });

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

  async findOne(id: number): Promise<ResponeTaskDto | null> {
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
