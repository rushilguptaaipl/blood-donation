import {  ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

 config();
const configService = new ConfigService();
module.exports = {
  type: 'postgres',
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  entities: ["dist/**/*.entity{.ts,.js}"],
// entities:[User],
//   migrations: [
//     __dirname + '/migrations/**/*{.ts,.js}',
//   ],
//   factories: ["dist/**/factory/**/*.{js, ts}"],
//   seeds: ["dist/**/seeds/**/*.{js, ts}"],
seeds:["dist/**/*.seed.{js, ts}"]
}




