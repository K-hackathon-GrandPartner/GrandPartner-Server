import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { SocialLogin } from 'src/auth/entities/social_login.entity';
import { JwtService } from '@nestjs/jwt';
import { Profile } from './entities/profile.entity';
import { EnrollmentVerification } from './entities/enrollment_verification.entity';
import { Authentication } from './entities/authentication.entity';
import { Rating } from './entities/rating.entity';
import { AuthGuard } from 'src/common/services/auth_guard.service';
import { Room } from 'src/room/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: 'member',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      SocialLogin,
      Profile,
      EnrollmentVerification,
      Rating,
      Authentication,
      Room,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, AuthGuard, JwtService],
  exports: [TypeOrmModule.forFeature([User, Rating])],
})
export class UserModule {}
