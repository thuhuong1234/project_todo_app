import { IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  content: string;
}
