import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ContactDTO, FundraiserDTO } from './dto/request-form.dto';

@Entity()
export class RequestForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  user_id: number;

  @Column()
  organization_email: string;

  @Column()
  organization_name: string;

  @Column()
  organization_info: string;

  @Column()
  organization_address: string;

  @Column()
  organization_website: string;

  @Column()
  organization_number: string;

  @Column()
  contact: string;

  @Column()
  fundraiser: string;

  @Column({ default: null })
  payment: string;

  @Column({ default: null })
  products: string;

  @Column({ default: null })
  questions: string;

  @Column({ default: false })
  status: number;

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
