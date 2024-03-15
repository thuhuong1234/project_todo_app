import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({ data: createTaskDto });
  }

  async findAll(page: number, limit: number) {
    limit = parseInt(limit.toString());
    const skip = (page - 1) * limit;
    const task = await this.prisma.task.findMany({
      skip,
      take: limit,
    });
    const total = task.length;
    const pages = Math.ceil(total / limit);
    return { task, total, page, pages, limit };
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
