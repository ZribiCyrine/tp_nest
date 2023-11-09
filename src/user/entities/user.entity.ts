import { BaseEntity } from 'src/entities/base.entity';
import { TodoEntity } from 'src/entities/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cv } from 'src/cv/entities/cv.entity';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @OneToMany(type => Cv, cv => cv.user)
  cvs: Cv[];

  @OneToMany(type => TodoEntity, todo => todo.user)
  todos: TodoEntity[];
}
