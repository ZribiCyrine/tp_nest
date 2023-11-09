import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CreateCvDto } from './dto/create-cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}

  findAll(): Promise<Cv[]> {
    return this.cvRepository.find({ relations: ['skills', 'user'] });
  }

  findOne(id: number): Promise<Cv> { 
    return this.cvRepository.findOneBy({ id }); 
  }

  async create(cvData: CreateCvDto): Promise<Cv> {
    const cv = this.cvRepository.create(cvData);
    return this.cvRepository.save(cv);
  }

  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    await this.cvRepository.update(id, updateCvDto);
    return this.cvRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> { 
    await this.cvRepository.delete(id);
  }
}
