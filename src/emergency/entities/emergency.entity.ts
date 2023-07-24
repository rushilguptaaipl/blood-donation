import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emergency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patient_name :string
  
    @Column({type:"varchar"})
    registerar_name: string;
  
    @Column({ type: 'bigint' })
    contact: number;
  
    @Column({type:"varchar"})
    city: string;

    @Column()
    email :string
  
    @Column()
    age: number;
  
    @Column({type:"varchar"})
    hospital: string;

    @Column({type:"varchar"})
    blood_group :string;
  
    @DeleteDateColumn()
    deletedAt?: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    public updatedAt: Date;
  }
 



