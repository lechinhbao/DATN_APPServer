import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
const mongoose = require('mongoose');

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nhatnam:100603@cluster0.lledcu9.mongodb.net/BagStore?retryWrites=true&w=majority'),
    UserModule, AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
