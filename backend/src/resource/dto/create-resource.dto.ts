// src/resources/dto/create-resource.dto.ts

import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  MinLength,
  IsUrl,
} from 'class-validator';
import { ResourceType } from '../enums/resource-type.enum';

export class CreateResourceDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser un texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title: string;

  @IsNotEmpty({ message: 'El autor es obligatorio' })
  @IsString({ message: 'El autor debe ser un texto' })
  author: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  description?: string;

  @IsEnum(ResourceType, {
    message:
      'El tipo debe ser uno de los siguientes: book, article, magazine, video, document',
  })
  type: ResourceType;

  //   @IsIn(['book', 'article', 'magazine', 'video', 'document'])
  //   type: 'book' | 'article' | 'magazine' | 'video' | 'document';

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  categoryId: number;

  @IsNotEmpty({ message: 'La URL del archivo es obligatoria' })
  @IsString({ message: 'La URL debe ser un texto' })
  @IsUrl({}, { message: 'Debe ser una URL válida' })
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
