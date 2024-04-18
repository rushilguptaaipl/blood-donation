import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Roles extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_super_admin: boolean;

  @Column({
    type: 'json',
    nullable: true,
  })
  permissions: string[];

  @UpdateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
