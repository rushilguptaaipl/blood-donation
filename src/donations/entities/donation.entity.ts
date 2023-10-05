import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from '../../city/entities/city.entity';

@Entity()
export class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'bigint' })
  contact: number;

  @Column()
  email: string;

  @Column()
  DOB: string;

  @Column()
  blood_group: string;

  @Column({ nullable: true })
  disease: string;

  @Column()
  gender: string;

  @ManyToOne(() => City, (city) => city.donation)
  city: City;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
