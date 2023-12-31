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
import { LandRordProfileDto } from './dto/user-response.dto';
import { Room } from 'src/room/entities/room.entity';

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
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findOne(userId: number): Promise<LandRordProfileDto> {
    const landlord = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id: userId })
      .getOne();

    const contracts = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.contract', 'contract')
      .where('room.landlordId = :userId', { userId })
      .getMany()
      .then((result) => {
        // Contract가 있는 Room만 필터링
        return result.filter((room) => {
          return room.contract !== null;
        });
      });

    let review;

    if (contracts.length !== 0) {
      const contractIds = contracts.map((room) => ({
        contractId: room.contract.id,
        lesseeId: room.contract.lesseeId,
      }));

      review = await this.roomRepository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.contract', 'contract')
        .leftJoinAndSelect('contract.review', 'review')
        .where('contract.id IN (:...contractIds)', {
          contractIds: contractIds.map(({ contractId }) => contractId),
        }) // .map()을 사용하여 contractIds 추출
        .leftJoinAndSelect('review.user', 'user')
        .leftJoinAndSelect('user.profile', 'profile')
        .getOne();

      console.log(review.contract.review);
    }

    return {
      id: landlord.id,
      profileImageUrl: landlord.profile.imageUrl,
      name: landlord.userName,
      introduction: landlord.profile.introduction,
      rating: landlord.rating.rating,
      reviewCount: landlord.rating.reviewCount,
      review: {
        lesseeId: review?.contract.review.user.id,
        profileImageUrl: review?.contract.review.user.profile.imageUrl,
        name: review?.contract.review.user.userName,
        rating: review?.contract.review.rating,
        content: review?.contract.review.content,
        postDate: review?.contract.review.postDate,
        updateDate: review?.contract.review.updateDate,
      },
    };
  }

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
