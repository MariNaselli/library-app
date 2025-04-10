import { Injectable, NotFoundException } from '@nestjs/common';
//Injectable: Es un decorador que le dice a NestJS 
// que esta clase puede ser inyectada en otros lugares (por ejemplo, en un controlador). 
// --> Es como decir Esta clase puede ser usada por otros
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable() //Aplicamos el decorador @Injectable() para que esta clase se pueda inyectar en otros lados, como en un controlador.
export class ResourceService {
  private inMemoryResources: Resource[] = []; // Por ahora usamos un array en memoria

  create(createResourceDto: CreateResourceDto): Resource {
    const newResource: Resource = {
      id: Date.now(),
      ...createResourceDto,
      //uploadedByUserId: 1, // simulamos el ID de un usuario
      createdAt: new Date(),
      //updatedAt: new Date(),
      isDeleted: false,
    };

    this.inMemoryResources.push(newResource);
    return newResource;
  }

  findAll(): Resource[] {
    return this.inMemoryResources.filter((res) => !res.isDeleted);
  }
  // Recorré todos los elementos (res) y devolvé solo los que no estén eliminados
  //Buscá en la lista y devolvé los recursos que no estén marcados como eliminados

//   findOne(id: number): Resource {
//     const resource = this.inMemoryResources.find((res) => res.id === id && !res.isDeleted);
//     if (!resource) {
//       throw new NotFoundException(`Recurso con ID ${id} no encontrado.`);
//     }
//     return resource;
//   }

//   update(id: number, updateDto: UpdateResourceDto): Resource {
//     const resource = this.findOne(id);
//     const updated = {
//       ...resource,
//       ...updateDto,
//       updatedAt: new Date(),
//     };

//     const index = this.inMemoryResources.findIndex((res) => res.id === id);
//     this.inMemoryResources[index] = updated;
//     return updated;
//   }

//   remove(id: number): void {
//     const resource = this.findOne(id);
//     resource.isDeleted = true;
//   }
}

//Usamos un array en memoria (this.resources) como si fuera nuestra base de datos temporal.

//Creamos los métodos create, findAll, findOne, update y remove.

//Simulamos campos como id, createdAt, uploadedByUserId.

//Esto te sirve para probar todo el flujo antes de conectar con la base de datos.