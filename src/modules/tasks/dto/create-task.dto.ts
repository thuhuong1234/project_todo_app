import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  taskname: string;
  @IsNotEmpty()
  description: string;
  @IsOptional()
  startTime: Date;
  endTime: Date;
}
