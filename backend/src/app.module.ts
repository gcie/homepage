import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from 'dotenv';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GymModule } from './gym/gym.module';
import { UsersModule } from './users/users.module';

config();

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
        }),
        MongooseModule.forRoot(process.env.DB_URI),
        UsersModule,
        AuthModule,
        GymModule,
    ],
    controllers: [AppController],
    providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
