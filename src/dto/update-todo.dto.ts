import { User } from "@ngneat/falso";
import { IsIn, IsOptional, IsString, Length } from "class-validator";
import { StatusEnum } from "src/status.enum";

export class UpdateTodoDto{
    @IsString()
    @IsOptional()
    @Length(3,10)
    name: string;
    
    @IsString()
    @IsOptional()
    @Length(10,undefined)
    description: string;

    @IsOptional()
    @IsIn([StatusEnum.PENDING, StatusEnum.IN_PROGRESS, StatusEnum.COMPLETED], { message: `Le statut doit être l'un des statuts valides.` })
    status: StatusEnum;

    user: User;

    
}