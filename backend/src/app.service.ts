import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }
}
