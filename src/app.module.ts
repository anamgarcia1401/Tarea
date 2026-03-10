import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatModule } from './cats/cat.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import {ParticipantModule} from './games/participant/participant.module';
import {permission} from 'process';
import {PermissionModule} from './auth/permission/permission.module';
import {RolePermissionModule} from './auth/role-permission/role-permission.module';
import {RoleModule} from './auth/role/role.module';
import {UserModule} from './auth/user/user.module';
import {CommentModule} from './games/comment/comment.module';
import {GameModule} from './games/game/game.module';
import {SessionModule} from './games/session/session.module';

type SupportedDbTypes = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mongodb' | 'oracle';

@Module({
  imports: [
    CatModule,
    AuthModule,
    GamesModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<SupportedDbTypes>('DB_TYPE') ?? 'mysql',
        host: configService.get<string>('DB_HOST') ?? 'localhost',
        port: configService.get<number>('DB_PORT') ?? 5432,
        username: configService.get<string>('DB_USERNAME') ?? 'root',
        password: configService.get<string>('DB_PASSWORD') ?? 'root',
        database: configService.get<string>('DB_DATABASE') ?? 'test',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? false,
      }),
    }),
    GamesModule,
    ParticipantModule,
    PermissionModule,
    CommentModule,
    GameModule,
    SessionModule,


  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}