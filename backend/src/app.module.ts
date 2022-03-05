import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from 'dotenv';
import { join } from 'path';
import { ApiController } from './api/api/api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth/auth.controller';
import { UsersModule } from './users/users.module';

config();

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        UsersModule,
    ],
    controllers: [AppController, ApiController, AuthController],
    providers: [AppService],
})
export class AppModule {}
