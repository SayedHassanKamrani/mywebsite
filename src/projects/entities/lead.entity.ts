import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ default: 'website' })
  source: string;

  @CreateDateColumn()
  createdAt: Date;
}