import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('api/v1/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(Role.Leader)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.tasksService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Role.Leader)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Leader)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @Roles(Role.Leader)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Post(':taskId/participants')
  @Roles(Role.Leader)
  addUserToTask(
    @Param('taskId') taskId: string,
    @Query('participantId') participantId: string,
    @Query('Role') Role: string,
  ) {
    return this.tasksService.addUserToTask(+participantId, +taskId, Role);
  }

  @Delete(':taskId/participants')
  @Roles(Role.Leader)
  removeUserFromTask(
    @Param('taskId') taskId: string,
    @Query('participantId') participantId: string,
  ) {
    return this.tasksService.removeUserFromTask(+participantId, +taskId);
  }

  @Post(':taskId/reviews')
  @Roles(Role.Leader)
  addReviewToTask(
    @Param('taskId') taskId: string,
    @Query('reviewId') reviewId: string,
  ) {
    return this.tasksService.addReviewToTask(+reviewId, +taskId);
  }

  @Delete(':taskId/reviews')
  @Roles(Role.Leader)
  removeReviewFromTask(
    @Param('taskId') taskId: string,
    @Query('reviewId') reviewId: string,
  ) {
    return this.tasksService.removeReviewFromTask(+reviewId, +taskId);
  }
}
