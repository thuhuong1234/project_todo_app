import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(page: number, limit: number) {
    limit = parseInt(limit.toString());
    const skip = (page - 1) * limit;
    const categories = await this.prisma.category.findMany({
      skip,
      take: limit,
    });

    const total = categories.length;
    const pages = Math.ceil(total / limit) || 1;

    return { categories, total, page, pages, limit };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        tasksOfCategory: {
          include: {
            task: true,
          },
        },
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async addTaskInCategory(taskId: number, categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const isExistTaskInCategory = await this.prisma.taskOfCategory.findUnique({
      where: {
        taskId_categoryId: {
          taskId,
          categoryId,
        },
      },
    });
    if (isExistTaskInCategory) {
      throw new NotFoundException('Task already exist in category!');
    }

    return await this.prisma.taskOfCategory.create({
      data: {
        taskId,
        categoryId,
      },
    });
  }
  async removeTaskFromCategory(taskId: number, categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const isExistTaskInCategory = await this.prisma.taskOfCategory.findUnique({
      where: {
        taskId_categoryId: {
          taskId,
          categoryId,
        },
      },
    });
    if (!isExistTaskInCategory) {
      throw new NotFoundException('Task does not exist in category');
    }

    return await this.prisma.taskOfCategory.delete({
      where: {
        taskId_categoryId: {
          taskId,
          categoryId,
        },
      },
    });
  }
}
