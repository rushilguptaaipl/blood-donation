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
import { Gender } from '@emergency/enums/gender.enum';
import { BloodGroup } from '@emergency/enums/bloodGroup.enum';

@Entity()
export class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  DOB: string;

  @Column({type : 'enum' , enum : BloodGroup})
  blood_group: BloodGroup;

  @Column({ nullable: true })
  disease: boolean;

  @Column({type : 'enum' , enum : Gender})
  gender: Gender;

  @ManyToOne(() => City, (city) => city.donation)
  city: City;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
