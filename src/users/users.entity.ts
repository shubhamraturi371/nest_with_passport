import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Role } from '../enums/roles.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toClassOnly: false })
  @Column()
  password: string;

  @Column()
  information: string;

  @Column()
  address: string;

  @Column()
  website: string;

  @Column()
  number: string;

  @Column({ default: 1 })
  status: boolean;

  @Column({ default: null })
  email_verified_at: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
  })
  roles: Role[];

  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
