import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donation } from "./donation.entity";

@Entity()
export class City{
    @PrimaryGeneratedColumn()
    id :number

    @Column()
    city : string

    @OneToMany(()=>Donation , (donation)=> donation.city)
    donation : Donation[] 
}