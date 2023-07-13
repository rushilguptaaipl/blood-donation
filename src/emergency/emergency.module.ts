import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emergency } from './entities/emergency.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Emergency])],
  controllers: [EmergencyController],
  providers: [EmergencyService]
})
export class EmergencyModule {}
