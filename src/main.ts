import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { options } from 'joi';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    }
  );

  app.useGlobalPipes( // necesitario para que el class validator de los DTO funcione correctamente //
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted : true,
    }),
  )

  await app.listen();
  console.log(`Products Microservice running on port ${ envs.port }`)

}
bootstrap();

