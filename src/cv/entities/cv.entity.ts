import { BaseEntity } from 'src/entities/base.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Cv extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  firstname: string;
  
  @Column()
  age: number;
  
  @Column()
  cin: string;
  
  @Column()
  job: string;
  
  @Column()
  path: string;
  
  @ManyToOne(type => User, user => user.cvs)
  user: User;

  @ManyToMany(() => Skill, skill => skill.cvs)
  @JoinTable()
  skills: Skill[];
}
