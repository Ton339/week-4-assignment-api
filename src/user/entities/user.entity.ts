import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Task } from 'src/task/entities/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column()
  avatar: string;

  @Column()
  address: string;

  @Column()
  birthdate: Date;

  @Column()
  phone: string;

  @Column()
  occupation: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @DeleteDateColumn()
  deleted_at: Date; // Deletion date

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
