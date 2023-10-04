import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { EnrollmentVerification } from './enrollment_verification.entity';
import { Authentication } from './authentication.entity';
import { Rating } from './rating.entity';

@Entity('user', { database: 'member' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('tinyint', {
    name: 'login_type',
    comment: '1: 카카오, 2: 휴대폰',
    unsigned: true,
  })
  loginType: number;

  @Column('tinyint', {
    name: 'user_type',
    comment: '1: 임대인, 2: 임차인',
    unsigned: true,
  })
  userType: number;

  @Column('varchar', { name: 'user_name', length: 30 })
  userName: string;

  @Column('tinyint', {
    name: 'status',
    comment: '1: 활성화, 2: 휴면, 3: 탈퇴',
    unsigned: true,
    default: () => 1,
  })
  status: number;

  @OneToOne(() => Profile, (profile) => profile.userId)
  profile: Profile;

  @OneToOne(
    () => EnrollmentVerification,
    (enrollmentVerification) => enrollmentVerification.userId,
  )
  enrollmentVerification: EnrollmentVerification;

  @OneToOne(() => Authentication, (authentication) => authentication.userId)
  authentication: Authentication;

  @OneToOne(() => Rating, (rating) => rating.landlordId)
  rating: Rating;
}
