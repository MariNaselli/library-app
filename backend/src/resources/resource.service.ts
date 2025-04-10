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

  findOne(id: number): Resource {
    const resource = this.inMemoryResources.find((res) => res.id === id && !res.isDeleted);
    if (!resource) {
      throw new NotFoundException(`Recurso con ID ${id} no encontrado.`);
    }
    return resource;
  }

  //Crear una ruta para obtener un solo recurso por su id, por ejemplo:
  //.find() busca el primer recurso con ese id que no esté eliminado.
  //Si no lo encuentra, lanza un error 404 con un mensaje.
  //Si sí lo encuentra, lo devuelve.

  update(id: number, updateDto: Partial<CreateResourceDto>): Resource {
    const resource = this.findOne(id);
    //Buscamos el recurso original que tenga ese id en la lista (ya lo implementamos antes con findOne).
    const updated = {
      ...resource,
      ...updateDto,
      updatedAt: new Date(), // actualizamos fecha
    };
    //Esto se llama spread operator (...) en JavaScript/TypeScript.
    //...resource → copia todas las propiedades del recurso original (title, author, type, etc.).
    //...updateDto → copia todos los campos nuevos que vienen del body de la petición. 
    //Si alguno de estos campos ya existía (por ejemplo, title), lo sobrescribe.
    //updatedAt: new Date() → agrega o reemplaza el campo updatedAt con la fecha actual.

    const index = this.inMemoryResources.findIndex((res) => res.id === id);
    //Buscamos la posición (índice) en el array inMemoryResources donde está ese recurso.
    this.inMemoryResources[index] = updated;
    //Reemplazamos el recurso en esa posición con la versión actualizada.
    return updated;
  }

//Nota: usamos Partial<CreateResourceDto> para que puedan actualizar solo algunos campos (opcional).
//Buscamos el recurso por id
//Recibe un id (el recurso que queremos modificar).
//Recibe updateDto, que es un objeto con los nuevos datos.
//Partial<CreateResourceDto> significa que puede tener uno, varios o todos los campos del DTO original. Nada es obligatorio.
//


//   remove(id: number): void {
//     const resource = this.findOne(id);
//     resource.isDeleted = true;
//   }
}

//Usamos un array en memoria (this.resources) como si fuera nuestra base de datos temporal.

//Creamos los métodos create, findAll, findOne, update y remove.

//Simulamos campos como id, createdAt, uploadedByUserId.

//Esto te sirve para probar todo el flujo antes de conectar con la base de datos.