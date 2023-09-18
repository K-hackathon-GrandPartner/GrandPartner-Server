import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/common/services/auth_guard.service';
import { JwtService } from '@nestjs/jwt';

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
        database: 'room',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Room]),
  ],
  controllers: [RoomController],
  providers: [RoomService, AuthGuard, JwtService],
})
export class RoomModule {}
