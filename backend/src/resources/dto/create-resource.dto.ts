// src/resources/dto/create-resource.dto.ts

import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { ResourceType } from '../enums/resource-type.enum';

export class CreateResourceDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ResourceType)
  type: ResourceType;

//   @IsIn(['book', 'article', 'magazine', 'video', 'document'])
//   type: 'book' | 'article' | 'magazine' | 'video' | 'document';

  @IsNumber()
  categoryId: number;

  @IsString()
  fileUrl: string;

  // @IsOptional()
  // @IsString()
  // coverUrl?: string;

  // @IsOptional()
  // @IsDateString()
  // publicationDate?: Date;

  // @IsNumber()
  // uploadedByUserId: number;
}


