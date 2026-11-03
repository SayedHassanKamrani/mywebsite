import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../projects/entities/lead.entity.js'; 
import { CreateLeadDto } from '../projects/dto/create-lead.dto.js';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
  ) {}

  create(dto: CreateLeadDto) {
    const lead = this.leadRepo.create(dto);
    return this.leadRepo.save(lead);
  }

  findAll() {
    return this.leadRepo.find({ order: { createdAt: 'DESC' } });
  }
}