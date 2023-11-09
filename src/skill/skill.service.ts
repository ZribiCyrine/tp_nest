import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  findOne(id: number): Promise<Skill> {
    return this.skillRepository.findOneBy({ id });
  }

  async create(skillData: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(skillData);
    return this.skillRepository.save(skill);
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    await this.skillRepository.update(id, updateSkillDto);
    return this.skillRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.skillRepository.delete(id);
  }
}
