import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateCvDto {
   
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    age: number
    
    @IsNotEmpty()
    cin: string
    
    @IsNotEmpty()
    job: string
    
    @IsNotEmpty()
    path: string

    @IsNotEmpty()
    userId: number

    skill?: Skill[]

}
