import { Cv } from 'src/cv/entities/cv.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Skill extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  designation: string;

  @ManyToMany(() => Cv, cv => cv.skills)
  cvs: Cv[];
}
