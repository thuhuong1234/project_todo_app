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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.Leader)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.categoriesService.findAll(page, limit);
  }

  @Get(':id')
  @Roles(Role.Leader)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Leader)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(Role.Leader)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  @Post(':categoryId/tasks')
  @Roles(Role.Leader)
  addTaskInCategory(
    @Param('categoryId') categoryId: string,
    @Query('taskId') taskId: string,
  ) {
    return this.categoriesService.addTaskInCategory(+taskId, +categoryId);
  }
}
