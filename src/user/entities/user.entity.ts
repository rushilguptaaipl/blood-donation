import { Collection, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    role:string

    @DeleteDateColumn()
    deletedAt?: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    public updatedAt: Date;
}