import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { formatLoginType, formatReligion, formatSex } from './utils/format';
import { AuthService } from 'src/auth/auth.service';
import { Profile } from './entities/profile.entity';
import { EnrollmentVerification } from './entities/enrollment_verification.entity';
import { Authentication } from './entities/authentication.entity';
import { Rating } from './entities/rating.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(EnrollmentVerification)
    private readonly enrollmentVerificationRepository: Repository<EnrollmentVerification>,
    @InjectRepository(Authentication)
    private readonly authenticationRepository: Repository<Authentication>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async getLandlordRating(landlordId: number) {
    const landlordRating = await this.ratingRepository.findOne({
      where: { landlordId },
    });

    return landlordRating;
  }

  async createUser(createUserData: CreateUserDto): Promise<any> {
    const createUser = await this.userRepository.save({
      loginType: formatLoginType(createUserData.loginType),
      userType: 2,
      userName: createUserData.name,
    });

    const createProfile = await this.profileRepository.save({
      userId: createUser.id,
      imageUrl: createUserData.profileImage, // TODO: 프로필 이미지 Base64 -> 구글 클라우드 스토리지에 저장 후 URL로 변경
      religion: formatReligion(createUserData.religion),
      introduction: createUserData.introduction,
    });

    const createEnrollmentVerification =
      await this.enrollmentVerificationRepository.save({
        userId: createUser.id,
        university: createUserData.university,
        imageUrl: createUserData.enrollmentVerification
          ? createUserData.enrollmentVerification
          : null, // TODO: 입학증명서 이미지 Base64 -> 구글 클라우드 스토리지에 저장 후 URL로 변경
      });

    try {
      const createAuthentication = await this.authenticationRepository.save({
        userId: createUser.id,
        cellPhone: createUserData.cellPhone,
        sex: formatSex(createUserData.sex),
        birth: createUserData.birth,
        marketingConsent: createUserData.marketingConsent ? 1 : 0,
      });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate entry')
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: '같은 전화번호로 가입된 유저가 이미 존재합니다.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    await this.authService.updateUserByExternalId(
      createUserData.externalId,
      createUser.id,
    );

    return createUser;
  }

  async deleteUser(userId: number): Promise<any> {
    try {
      const deleteUser = await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :userId', { userId })
        .execute();

      const deleteProfile = await this.profileRepository
        .createQueryBuilder()
        .delete()
        .from(Profile)
        .where('userId = :userId', { userId })
        .execute();

      const deleteEnrollmentVerification =
        await this.enrollmentVerificationRepository
          .createQueryBuilder()
          .delete()
          .from(EnrollmentVerification)
          .where('userId = :userId', { userId })
          .execute();

      const deleteAuthentication = await this.authenticationRepository
        .createQueryBuilder()
        .delete()
        .from(Authentication)
        .where('userId = :userId', { userId })
        .execute();
    } catch (err) {
      throw new HttpException('유효하지 않은 유저입니다.', 400);
    }
  }
}
