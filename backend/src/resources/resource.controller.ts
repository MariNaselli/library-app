import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Controller('resources') // Esto define la ruta base: http://localhost:3000/resources
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {} //NestJS inyecta el servicio para que podamos usarlo en los métodos del controlador. Es como decir: "dame el servicio para poder llamarlo".

  @Post()
  create(@Body() createResourceDto: CreateResourceDto): Resource {
    return this.resourceService.create(createResourceDto);
  }


  @Get()
  findAll(): Resource[] {
    return this.resourceService.findAll();
  }

//Este @Get() está diciendo:
//“Si llega una petición GET a la ruta/resources, ejecutá esta función”.
//this.resourceService.findAll() llama al servicio, que ya hicimos arriba,
// y le dice: Dame la lista de recursos válidos

  @Get(':id')
  findOne(@Param('id') id: string): Resource {
    return this.resourceService.findOne(Number(id));
  }

  //@Get(':id'): esta ruta captura cualquier valor después de /resources/.
  //@Param('id'): obtiene ese valor de la URL (es un string por defecto).
  //Number(id): lo convertimos a número, porque el id en nuestra entidad es tipo number.

//   @Put(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateResourceDto: UpdateResourceDto,
//   ): Resource | undefined {
//     return this.resourceService.update(Number(id), updateResourceDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): boolean {
//     return this.resourceService.remove(Number(id));
//   }
}
