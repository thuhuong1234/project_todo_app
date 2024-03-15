import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { CategoriesModule } from './modules/categories/categories.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ load: [configuration] }),
    CategoriesModule,
    TasksModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
