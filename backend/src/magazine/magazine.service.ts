import { Injectable } from '@nestjs/common';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Magazine } from './entities/magazine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
  ) {
    this.magazineRepository = magazineRepository;
  }
  findAll() {
    return this.magazineRepository
      .createQueryBuilder('magazine')
      .select(['magazine.id', 'magazine.imageUrl'])
      .getMany();
  }

  findOne(id: number) {
    return this.magazineRepository
      .createQueryBuilder('magazine')
      .select(['magazine.id', 'magazine.imageUrl', 'magazine.content'])
      .where('magazine.id = :id', { id })
      .getOne();
  }
}
