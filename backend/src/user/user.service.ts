import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserData: CreateUserDto): Promise<User> {
    const { loginType, name } = createUserData;
    const result = await this.userRepository.save({
      loginType: +loginType,
      userName: name,
    });
    return result;
  }
}
