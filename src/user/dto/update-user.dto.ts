import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';
import { Cv } from 'src/cv/entities/cv.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
}
