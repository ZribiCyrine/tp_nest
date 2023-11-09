import { User } from "@ngneat/falso";
import { IsIn, IsString, Length } from "class-validator";
import { StatusEnum } from "src/status.enum";
import { DeepPartial } from "typeorm";

export class CreateTodoDto{
    @IsString()
    @Length(3,10)
    name: string;
    
    @IsString()
    @Length(10,undefined)
    description: string;

    @IsIn([StatusEnum.PENDING, StatusEnum.IN_PROGRESS, StatusEnum.COMPLETED], { message: `Le statut doit être l'un des statuts valides.` })
    status: StatusEnum;

    user: User;
    
}