import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/common/auth/jwt.access.strategy';
import { Pick } from '../pick/entities/pick.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pick])],
  providers: [UserService, UserResolver, JwtAccessStrategy],
})
export class UserModule {}
