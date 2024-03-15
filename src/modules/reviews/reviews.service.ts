import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    return await this.prisma.reviews.create({ data: createReviewDto });
  }

  async findAll(page: number, limit: number) {
    limit = parseInt(limit.toString());
    const skip = (page - 1) * limit;
    const reviews = await this.prisma.reviews.findMany({
      skip,
      take: limit,
    });
    const total = reviews.length;
    const pages = Math.ceil(total / limit) || 1;
    return { reviews, total, page, pages, limit };
  }

  async findOne(id: number) {
    const review = await this.prisma.reviews.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.reviews.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return await this.prisma.reviews.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: number) {
    const review = await this.prisma.reviews.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return await this.prisma.reviews.delete({
      where: { id },
    });
  }
}
