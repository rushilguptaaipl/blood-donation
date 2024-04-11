import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donation } from "../../donations/entities/donation.entity";
import { Emergency } from "src/emergency/entities/emergency.entity";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    city: string

    @OneToMany(() => Donation, (donation) => donation.city, { nullable: true })
    donation: Donation[]

    @OneToMany(() => Emergency, (emergency) => emergency.city, { nullable: true })
    emergency: Emergency[]

    @DeleteDateColumn()
    deletedAt?: Date;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    public updatedAt: Date;
}