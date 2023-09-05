import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('social_login', { schema: 'auth' })
export class SocialLogin {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'userId', unsigned: true })
  userId: number;

  @Column('smallint', {
    name: 'social_code',
    comment: '1: 카카오',
    unsigned: true,
  })
  socialCode: number;

  @Column('varchar', { name: 'external_id', length: 64 })
  externalId: string;

  @Column('varchar', { name: 'access_token', length: 256 })
  accessToken: string;

  @Column('timestamp', {
    name: 'update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;
}
