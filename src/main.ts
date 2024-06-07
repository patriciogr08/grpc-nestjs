import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';


async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'user',
      protoPath: join('./src/proto/user.proto'),
    },
  });

  app.listen().then(() => console.log('Microservice is listening'));
}
bootstrap();
