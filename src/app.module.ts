import { Module, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './entities/todo.entity';
import { UuidService } from './uuid/uuid.service';
import { UuidController } from './uuid/uuid.controller';
import { UuidModule } from './uuid/uuid.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { User } from './user/entities/user.entity';
import { SkillService } from './skill/skill.service';
import { CvService } from './cv/cv.service';
import { UserService } from './user/user.service';
import { SkillController } from './skill/skill.controller';
import { CvController } from './cv/cv.controller';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './middlewares/auth-middleware/auth-middleware.middleware';

@Module({
  imports: [CommonModule, TypeOrmModule, TodoModule, UuidModule, TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'sa',
    password: '123456',
    database: 'todos',
    entities: [TodoEntity, Cv, Skill, User],
    synchronize: true,
    options: {
      trustServerCertificate: true,
      enableArithAbort: true  
    }
  }),
  TypeOrmModule.forFeature([TodoEntity, Cv, Skill, User]),
  UuidModule,
  CvModule,
  SkillModule,
  UserModule
],
  controllers: [AppController, TodoController, UuidController, SkillController, CvController, UserController],
  providers: [AppService, TodoService, UuidService, SkillService, CvService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(
      {path: 'todo', method: RequestMethod.GET},
      {path: 'todo*', method: RequestMethod.POST},
      {path: 'todo*', method: RequestMethod.PUT},
    );
  }
}
