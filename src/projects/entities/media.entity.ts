import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Project } from './project.entity.js';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt?: string;

  @Column({ default: 'image' })
  type: string;

  @Column({ nullable: true })
  projectId?: string;

  @ManyToOne(() => Project, (project) => project.gallery, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  project?: Relation<Project>;

  @CreateDateColumn()
  createdAt: Date;
}