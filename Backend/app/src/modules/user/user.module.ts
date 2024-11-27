import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CodeEntity } from './entities/code.entity';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { UserController } from './user.controller';
import { DataEntity } from './entities/data.entity';
import { DataService } from './services/data.service';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity, CodeEntity, DataEntity]),
  ],
  providers: [UserService, EmailService, DataService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
