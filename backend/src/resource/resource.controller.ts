import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Controller('resources') // Esto define la ruta base: http://localhost:3000/resources
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {} //NestJS inyecta el servicio para que podamos usarlo en los métodos del controlador. Es como decir: "dame el servicio para poder llamarlo".

  // @Post()
  // create(@Body() createResourceDto: CreateResourceDto): Resource {
  //   return this.resourceService.create(createResourceDto);
  // }

  @Post()
  async create(
    @Body() createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    return this.resourceService.create(createResourceDto);
  }

  // @Get()
  // findAll(): Resource[] {
  //   return this.resourceService.findAll();
  // }

  @Get()
  async findAll(): Promise<Resource[]> {
    return this.resourceService.findAll();
  }

  //Este @Get() está diciendo:
  //“Si llega una petición GET a la ruta/resources, ejecutá esta función”.
  //this.resourceService.findAll() llama al servicio, que ya hicimos arriba,
  // y le dice: Dame la lista de recursos válidos

  // @Get(':id')
  // findOne(@Param('id') id: string): Resource {
  //   return this.resourceService.findOne(Number(id));
  // }

  //@Get(':id'): esta ruta captura cualquier valor después de /resources/.
  //@Param('id'): obtiene ese valor de la URL (es un string por defecto).
  //Number(id): lo convertimos a número, porque el id en nuestra entidad es tipo number.
  // Se puede mejorar asi:
  //@Get(':id')
  //findOne(@Param('id', ParseIntPipe) id: number): Resource {
  //return this.resourceService.findOne(id);
  //}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Resource> {
    return this.resourceService.findOne(id);
  }

  //   @Put(':id')
  //   update(@Param('id', ParseIntPipe) id: number,
  //   @Body() updateDto: UpdateResourceDto,
  //   ): Resource {
  //   return this.resourceService.update(id, updateDto);
  // }
  //@Param('id', ParseIntPipe) id: number --> Obtiene el id de la URL como antes, pero ahora lo convierte automáticamente en número gracias a ParseIntPipe.
  // Si alguien pone /resources/abc, NestJS da error automático: "Validation failed (numeric string is expected)".
  // ParseIntPipe: es un “tubo” (pipe) de NestJS que transforma y valida que el parámetro sea un número entero.
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateResourceDto,
  ): Promise<Partial<Resource>> {
    return this.resourceService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Resource> {
    return this.resourceService.remove(id);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number): boolean {
  //   return this.resourceService.remove(id);
  // }
}
