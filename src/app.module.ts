import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typrorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      TasksModule]
})
export class AppModule {}
