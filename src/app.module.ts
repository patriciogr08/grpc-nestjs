import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User/user.entity';
import { UserController } from './user/user.controller';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '24t0RreS41',
      database: 'test',
      entities: [ User ],
      synchronize: true,
      options: {
        encrypt: false,
      },
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
