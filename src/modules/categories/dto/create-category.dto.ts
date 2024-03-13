import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  categoryname: string;
  @IsNotEmpty()
  description: string;
}
