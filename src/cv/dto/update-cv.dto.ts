import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { IsNumber, IsOptional, IsString, Length, isNumber, isString } from "class-validator";


export class UpdateCvDto extends PartialType(CreateCvDto) {
  
    @IsNumber()
    id: number
    @IsString()
    name: string;
    @IsString()
    firstname: string;
    @IsNumber()
    age: number;
    @IsNumber()
    cin: string;
    @IsString()
    job: string;
    @IsString()
    path: string;
    user: User;
    skills: Skill[];

}


