import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Media } from './media.entity.js';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  industry: string;

  @Column()
  type: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  challenge?: string;

  @Column({ type: 'text', nullable: true })
  solution?: string;

  @Column({ type: 'text', nullable: true })
  result?: string;

  @Column({ nullable: true })
  figmaEmbed?: string;

  @Column({ nullable: true })
  liveUrl?: string;

  @Column({ default: false })
  featured: boolean;

  @Column({ nullable: true })
  thumbnailId?: string;

  @OneToOne(() => Media, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'thumbnailId' })
  thumbnail?: Relation<Media>;

  @OneToMany(() => Media, (media) => media.project)
  gallery: Relation<Media[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}