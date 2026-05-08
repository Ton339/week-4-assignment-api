import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsNotEmpty,
  IsNumber, // Can't be empty
  IsString, // Must be string
} from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  priority: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
