import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { JWT_EXPIRATION_TIME } from 'src/app.constants';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

config();

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: JWT_EXPIRATION_TIME } }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
