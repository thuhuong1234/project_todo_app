import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  taskname: string;
  @IsNotEmpty()
  description: string;
}
