import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('magazine', { database: 'magazine' })
export class Magazine {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('text', { name: 'imageUrl' })
  imageUrl: string;

  @Column('varchar', { name: 'tag', length: 128 })
  tag: string;

  @Column('varchar', { name: 'title', length: 128 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;
}
