import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { Gender } from '@emergency/enums/gender.enum';
import { BloodGroup } from '@emergency/enums/bloodGroup.enum';

@Entity()
export class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bigint' })
  contact: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  DOB: Date;

  @Column({ type: 'enum', enum: BloodGroup })
  blood_group: BloodGroup;

  @Column({ type: "boolean" })
  disease: boolean;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @ManyToOne(() => City, (city) => city.donation)
  city: City;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
