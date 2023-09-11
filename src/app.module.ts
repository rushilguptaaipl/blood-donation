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
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Donation,Emergency,City],
      synchronize: false,
      autoLoadEntities:true,
      ssl: {
        ca: fs.readFileSync(process.env.SSL_CA_CERTIFICATES),
      },
    }),
    EmergencyModule,
    AdminModule,
    CityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
