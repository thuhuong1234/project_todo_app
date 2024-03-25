import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async addUserToTask(participantId: number, taskId: number, Role: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const participant = await this.prisma.user.findUnique({
      where: {
        id: participantId,
      },
    });
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    if (!['leader', 'user'].includes(participant.role.toLowerCase())) {
      throw new BadRequestException('Invalid role');
    }

    const isExistUserInTask = await this.prisma.taskOfUser.findUnique({
      where: {
        participantId_taskId: {
          participantId,
          taskId,
        },
      },
    });
    if (isExistUserInTask) {
      throw new BadRequestException('User already in task');
    }

    const userToTask = await this.prisma.taskOfUser.create({
      data: {
        participantId,
        taskId,
      },
    });

    return userToTask;
  }
  async removeUserFromTask(participantId: number, taskId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const participant = await this.prisma.user.findUnique({
      where: {
        id: participantId,
      },
    });
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    const isExistUserInTask = await this.prisma.taskOfUser.findUnique({
      where: {
        participantId_taskId: {
          participantId,
          taskId,
        },
      },
    });
    if (!isExistUserInTask) {
      throw new BadRequestException('Participant does not exist in task');
    }

    return await this.prisma.taskOfUser.delete({
      where: {
        participantId_taskId: {
          participantId,
          taskId,
        },
      },
    });
  }
}
