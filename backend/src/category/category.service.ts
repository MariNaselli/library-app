import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import e from 'express';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await
    this.categoryRepository.findOne({
      where:{
        name:createCategoryDto.name,
        isDeleted:false,
      }
    });
    if(existing){
      throw new BadRequestException('Ya existe una categoría con ese nombre');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await
    this.categoryRepository.find({ where: { isDeleted: false }, order:{id:'ASC'}, });
    if(!categories.length){
      throw new NotFoundException('No hay categorías disponibles')
    }
    return categories;
    
  }

  async findOne(id: number) {
    const category = await 
    this.categoryRepository.findOne({ where: { id, isDeleted: false } });
    if(!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`)
    }
    return category;
  }

//Actualizar la categoria si existe o si no está eliminada.
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id, isDeleted: false }, //buscamos la categoria por id(solo queremos categorias no eliminadas logicamente)
    });
    if (!category) {//si no encontramos una categoria valida.. lanzamos una excepción.
      throw new NotFoundException(`Categoría con id ${id} no encontrada`); //error 404
    }
    const updateCategory = Object.assign(category, updateCategoryDto); //object.assign copia las propiedades del DTO al objeto original. Asi evitamos pisar todo el objeto o perder informacion importante como id o isDeleted
    return this.categoryRepository.save(updateCategory);//Guardamos los cambios en la bd. Save puede tanto como crear o como actualizar (pero acá actualiza porque ya existe)
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
    category.isDeleted = true;
    return this.categoryRepository.save(category);
  }
}
