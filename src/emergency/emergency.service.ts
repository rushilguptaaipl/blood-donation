import { Injectable } from '@nestjs/common';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Emergency } from './entities/emergency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmergencyService {
  constructor(
    @InjectRepository(Emergency)
    private readonly emergencyRepo: Repository<Emergency>,
  ) {}
  create(createEmergencyDto: CreateEmergencyDto) {
    return this.emergencyRepo.save(createEmergencyDto);
  }
}
