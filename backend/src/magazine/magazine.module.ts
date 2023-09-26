import { Module } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Magazine } from './entities/magazine.entity';

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
        database: 'magazine',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Magazine]),
  ],
  controllers: [MagazineController],
  providers: [MagazineService],
})
export class MagazineModule {}
