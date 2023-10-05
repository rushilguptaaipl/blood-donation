import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationsModule } from './donations/donations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donations/entities/donation.entity';
import { EmergencyModule } from './emergency/emergency.module';
import { Emergency } from './emergency/entities/emergency.entity';
import { City } from './city/entities/city.entity';
import { CityModule } from './city/city.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as fs from 'fs';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user/entities/user.entity';
import { jwtConstants } from './user/constants/constants';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    DonationsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Donation,Emergency,City,User],
      // entities: ["dist/**/*.entity{.ts,.js}"],
      url : process.env.DB_URL,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      autoLoadEntities:true,
    }),
    
    EmergencyModule,
    CityModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
