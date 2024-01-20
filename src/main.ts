import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views')); 
  app.setViewEngine('ejs');
  app.use(cookieParser());
  app.enableCors();
  await app.listen((process.env.PORT||3000),()=>{
    console.log("server started on port " + process.env.PORT);
    
  });
}
bootstrap();
