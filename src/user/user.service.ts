import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ResponeUserDto } from './dto/respone-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponeUserDto> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<ResponeUserDto[]> {
    return await this.userRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<ResponeUserDto | null> {
    return await this.userRepository.findOne({
      where: { id },
      order: { id: 'ASC' },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponeUserDto> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
