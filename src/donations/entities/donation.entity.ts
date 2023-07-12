import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'bigint' })
  contact: number;
  @Column()
  city: string;
  @Column()
  age: number;
  @Column()
  disease: string;
}



