import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { formatLoginType, formatReligion, formatSex } from './utils/format';
import { AuthService } from 'src/auth/auth.service';
import { Profile } from './entities/profile.entity';
import { EnrollmentVerification } from './entities/enrollment_verification.entity';
import { Authentication } from './entities/authentication.entity';

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
  ) {}

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

    const createAuthentication = await this.authenticationRepository.save({
      userId: createUser.id,
      cellPhone: createUserData.cellPhone,
      sex: formatSex(createUserData.sex),
      birth: createUserData.birth,
      marketingConsent: createUserData.marketingConsent ? 1 : 0,
    });
    await this.authService.updateUserByExternalId(
      createUserData.externalId,
      createUser.id,
    );
  }
}
