import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationTaskDto } from './dto/pagination-task.dto';
import {
  PaginatedTaskResponseDto,
  ResponeTaskDto,
} from './dto/respone-task.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Query } from '@nestjs/common';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<ResponeTaskDto> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query() query: PaginationTaskDto,
  ): Promise<PaginatedTaskResponseDto> {
    const page = query._page ? parseInt(query._page.toString()) : 1;
    const limit = query._per_page ? parseInt(query._per_page.toString()) : 10;
    return this.taskService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponeTaskDto | null> {
    return this.taskService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    return this.taskService.update(parseInt(id), updateTaskDto);
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<UpdateResult> {
    return this.taskService.update(parseInt(id), createTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.taskService.remove(parseInt(id));
  }
}
