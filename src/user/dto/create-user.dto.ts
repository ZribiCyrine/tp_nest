import { IsNumber, IsString } from "class-validator";
import { Cv } from "src/cv/entities/cv.entity";

export class CreateUserDto {
    
    @IsString()
    username: string;
    
    @IsString()
    email: string;
    
    @IsString()
    password: string;
    
    cvs: Cv[];
}
