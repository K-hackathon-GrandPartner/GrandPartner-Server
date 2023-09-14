import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { formatLoginType } from './utils/format';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserData: CreateUserDto): Promise<any> {
    const createUser = await this.userRepository.save({
      loginType: formatLoginType(createUserData.loginType),
      userType: 2,
      userName: createUserData.name,
    });
    await this.authService.updateUserByExternalId(
      createUserData.externalId,
      createUser.id,
    );
  }
}
