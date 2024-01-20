import { City } from 'src/city/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../enums/gender.enum';
import { BloodGroup } from '@emergency/enums/bloodGroup.enum';

@Entity()
export class Emergency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  patient_name: string;

  @Column({ type: 'varchar' })
  registerar_name: string;

  @Column({ type: 'bigint' })
  contact: number;

  @ManyToOne(() => City, (city) => city.emergency)
   city : City

  @Column({ type: 'varchar' })
  email: string;

  @Column({type : "int"})
  age: number;

  @Column({ type: 'varchar' })
  hospital: string;

  @Column({ type : "enum" , enum : BloodGroup })
  blood_group: BloodGroup;

  @Column({ type : "enum" , enum : Gender })
  gender: Gender;

  @Column({type : "boolean" , nullable:true})
  status : boolean;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
