import { IsNumber, IsString } from "class-validator";
import { Cv } from "src/cv/entities/cv.entity";

export class CreateSkillDto {
   
    @IsString()
    designation: string;

    cvs: Cv[];
}
