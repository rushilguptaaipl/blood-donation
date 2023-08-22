import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationsModule } from './donations/donations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donations/entities/donation.entity';
import { EmergencyModule } from './emergency/emergency.module';
import { AdminModule } from './admin/admin.module';
import { Emergency } from './emergency/entities/emergency.entity';
import { City } from './city/entity/city.entity';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    DonationsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'admin',
      password: 'redhat',
      database: 'blood_donation',
      entities: [Donation,Emergency,City],
      synchronize: true,
    }),
    EmergencyModule,
    AdminModule,
    CityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
