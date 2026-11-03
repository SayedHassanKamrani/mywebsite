import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity.js';
import { Media } from './entities/media.entity.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
  ) {}

  async create(dto: CreateProjectDto) {
    let thumbnailId = dto.thumbnailId;

    // اگر ادمین عکس آپلود کرده بود و آدرسش را فرستاد
    if (dto.thumbnailUrl) {
      const media = this.mediaRepo.create({ url: dto.thumbnailUrl, type: 'image' });
      await this.mediaRepo.save(media);
      thumbnailId = media.id;
    }

    // جدا کردن thumbnailUrl از دیتای پروژه برای جلوگیری از خطای دیتابیس
    const { thumbnailUrl, ...projectData } = dto;
    
    const project = this.projectRepo.create({ ...projectData, thumbnailId });
    return this.projectRepo.save(project);
  }

  findAll(featured?: boolean) {
    return this.projectRepo.find({
      where: featured !== undefined ? { featured } : {},
      relations: { thumbnail: true, gallery: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(slug: string) {
    const project = await this.projectRepo.findOne({
      where: { slug },
      relations: { thumbnail: true, gallery: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.projectRepo.update(id, dto);
    return this.projectRepo.findOne({
      where: { id },
      relations: { thumbnail: true, gallery: true },
    });
  }

  async remove(id: string) {
    await this.projectRepo.delete(id);
    return { deleted: true };
  }
}