import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusEnum } from "../status.enum";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { validationMessages } from "../validation-messages";
import { BaseEntity } from "./base.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class TodoEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    @IsString()
    @IsNotEmpty({message: validationMessages.nameRequired})
    @Length(3,10,{message: validationMessages.nameLength})
    name: string;

    @Column() 
    @IsString()
    @IsNotEmpty({message: validationMessages.descriptionRequired})
    @Length(10,undefined,{message: validationMessages.descriptionLength})
    description: string;
 
    @Column() 
    status: StatusEnum;

    @ManyToOne(() => User, user => user.todos)
    user: User;
}

