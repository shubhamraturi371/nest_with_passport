import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { generateString } from '@nestjs/typeorm';

@Entity()
export class Fundraisers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: generateString().toUpperCase() })
  ulid: string;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column()
  pickup_date: string;

  @Column()
  reason: string;

  @Column()
  goal: string;

  @Column({ default: 1 })
  status: boolean;

  @Column({ default: true })
  isActive: boolean;

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
