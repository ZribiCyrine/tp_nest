import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsString } from 'class-validator';
import { Cv } from 'src/cv/entities/cv.entity';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {

}
