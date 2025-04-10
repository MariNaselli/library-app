import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
//Injectable: Es un decorador que le dice a NestJS
// que esta clase puede ser inyectada en otros lugares (por ejemplo, en un controlador).
// --> Es como decir Esta clase puede ser usada por otros
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable() //Aplicamos el decorador @Injectable() para que esta clase se pueda inyectar en otros lados, como en un controlador.
export class ResourceService {
  //private inMemoryResources: Resource[] = []; // Por ahora usamos un array en memoria
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}
  //Esto le dice a Nest que queremos trabajar con el repositorio de Resource, que es la forma en que TypeORM se conecta a la base de datos para hacer queries, inserts, updates, etc.

  // create(createResourceDto: CreateResourceDto): Resource {
  //   const newResource: Resource = {
  //     id: Date.now(),
  //     ...createResourceDto,
  //     //uploadedByUserId: 1, // simulamos el ID de un usuario
  //     createdAt: new Date(),
  //     //updatedAt: new Date(),
  //     isDeleted: false,
  //   };

  //   this.inMemoryResources.push(newResource);
  //   return newResource;
  // }

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    try {
      const newResource = this.resourceRepository.create(createResourceDto);
      return this.resourceRepository.save(newResource);
    } catch (error) {
      console.error('Error al crear el recurso:', error);
      throw new InternalServerErrorException('No se pudo crear el recurso');
    }
  }

  //async → indica que la función trabaja con operaciones asíncronas (que pueden tardar, como acceder a la base de datos).
  //create(...) → nombre de la función.
  //createResourceDto: CreateResourceDto → estamos recibiendo un objeto con los datos necesarios para crear el recurso (título, autor, tipo, etc.).
  //Promise<Resource> → significa que esta función va a devolver una promesa que cuando se resuelva va a contener un objeto del tipo Resource.
  //try {Acá empieza un bloque de código que intenta ejecutar ciertas operaciones. Si algo falla, pasa al bloque catch.
  //const newResource = this.resourceRepository.create(createResourceDto);
  //this.resourceRepository → es el repositorio que usamos para acceder a la base de datos (viene de TypeORM).
  //.create(...) → no guarda en la base de datos todavía, solo crea una instancia del objeto Resource con los datos que pasamos.
  //createResourceDto → es el objeto con los datos que vinieron del frontend o del cliente (ej: título, autor, etc.).
  //newResource → es ahora un objeto en memoria con todos los datos, pero aún no está guardado en la base.
  //return this.resourceRepository.save(newResource);
  //.save(...) → guarda efectivamente newResource en la base de datos.
  //Al hacer return, se lo devolvemos al que llamó a esta función.
  //Como esta función es async, lo que devuelve es una promesa que contiene el recurso ya guardado.
  //catch (error) {Si algo falla dentro del try, por ejemplo si la base de datos está caída o los datos son inválidos, el código salta a este bloque.
  //console.error('Error al crear el recurso:', error);Muestra en consola el error real para que el desarrollador (o vos cuando estés debuggeando) pueda ver qué pasó.
  //throw new InternalServerErrorException('No se pudo crear el recurso');Esto lanza una excepción personalizada de NestJS, que devuelve un código HTTP 500 (Error interno del servidor).
  //El mensaje "No se pudo crear el recurso" será devuelto al cliente que hizo la petición.

  //------------------------------//

  // findAll(): Resource[] {
  //   return this.inMemoryResources.filter((res) => !res.isDeleted);
  // }
  // // Recorré todos los elementos (res) y devolvé solo los que no estén eliminados
  //Buscá en la lista y devolvé los recursos que no estén marcados como eliminados

  async findAll(): Promise<Resource[]> {
    return this.resourceRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' }, // opcional: para mostrar los más nuevos primero
    });
  }

  //async findAll(): Promise<Resource[]>
  //Indicamos que este método es asíncrono y que va a devolver una promesa con un array de Resource.

  //this.resourceRepository.find(...)
  //Le pedimos a TypeORM que busque en la tabla de recursos.

  //where: { isDeleted: false }
  //Solo queremos los que no están marcados como eliminados.

  //order: { createdAt: 'DESC' }
  //Ordena los resultados del más reciente al más viejo (opcional, pero útil).

  // findOne(id: number): Resource {
  //   const resource = this.inMemoryResources.find((res) => res.id === id && !res.isDeleted);
  //   if (!resource) {
  //     throw new NotFoundException(`Recurso con ID ${id} no encontrado.`);
  //   }
  //   return resource;
  // }

  async findOne(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!resource) {
      throw new NotFoundException(`Recurso con ID ${id} no encontrado`);
    }

    return resource;
  }

  //Crear una ruta para obtener un solo recurso por su id, por ejemplo:
  //.find() busca el primer recurso con ese id que no esté eliminado.
  //Si no lo encuentra, lanza un error 404 con un mensaje.
  //Si sí lo encuentra, lo devuelve.

  // update(id: number, updateDto: Partial<CreateResourceDto>): Resource {
  //   const resource = this.findOne(id);
  //   //Buscamos el recurso original que tenga ese id en la lista (ya lo implementamos antes con findOne).
  //   const updated = {
  //     ...resource,
  //     ...updateDto,
  //     updatedAt: new Date(), // actualizamos fecha
  //   };
  //   //Esto se llama spread operator (...) en JavaScript/TypeScript.
  //   //...resource → copia todas las propiedades del recurso original (title, author, type, etc.).
  //   //...updateDto → copia todos los campos nuevos que vienen del body de la petición.
  //   //Si alguno de estos campos ya existía (por ejemplo, title), lo sobrescribe.
  //   //updatedAt: new Date() → agrega o reemplaza el campo updatedAt con la fecha actual.

  //   const index = this.inMemoryResources.findIndex((res) => res.id === id);
  //   //Buscamos la posición (índice) en el array inMemoryResources donde está ese recurso.
  //   this.inMemoryResources[index] = updated;
  //   //Reemplazamos el recurso en esa posición con la versión actualizada.
  //   return updated;
  // }

  async update(
    id: number,
    updateDto: UpdateResourceDto,
  ): Promise<Partial<Resource>> {
    const resource = await this.resourceRepository.findOneBy({ id });

    if (!resource) {
      throw new NotFoundException(`Recurso con ID ${id} no encontrado`);
    }

    const updated = this.resourceRepository.merge(resource, updateDto); //merge de TypeORM agarra el resource (el que tenías en la base) y le mezcla los cambios nuevos del updateDto.Es como decir: “dejá todo como estaba, pero cambiale lo que viene en el DTO”.
    return this.resourceRepository.save(updated); // 👈 este retorno es un solo objeto, no un array
  }

  //Nota: usamos Partial<CreateResourceDto> para que puedan actualizar solo algunos campos (opcional).
  //Buscamos el recurso por id
  //Recibe un id (el recurso que queremos modificar).
  //Recibe updateDto, que es un objeto con los nuevos datos.
  //Partial<CreateResourceDto> significa que puede tener uno, varios o todos los campos del DTO original. Nada es obligatorio.
  //

  // remove(id: number): void {
  //   const resource = this.findOne(id);
  //   resource.isDeleted = true;
  // }

  // remove(id: number): boolean {
  //   const index = this.inMemoryResources.findIndex((r) => r.id === id);
  //   //Busca en el array inMemoryResources el índice del recurso que tenga el mismo id.
  //   //Usa findIndex() que recorre la lista y devuelve el índice del primer elemento que cumpla la condición.
  //   if (index === -1) return false;
  //   //Si no encuentra nada, devuelve -1
  //   this.inMemoryResources[index].isDeleted = true;
  //   //Si lo encontró, marca el recurso como eliminado lógicamente.
  //   return true;
  //   //Si llegó hasta acá, significa que el recurso fue marcado como eliminado, y se devuelve true
  // }
  //Este método devuelve un boolean, o sea, true si se eliminó, false si no

  async remove(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOneBy({ id }); // Busca el recurso por ID

    if (!resource) {
      throw new NotFoundException(`Recurso con ID ${id} no encontrado`);
    }

    resource.isDeleted = true; // Marca como eliminado
    return this.resourceRepository.save(resource); // Guarda y devuelve el recurso
  }
}

//Usamos un array en memoria (this.resources) como si fuera nuestra base de datos temporal.

//Creamos los métodos create, findAll, findOne, update y remove.

//Simulamos campos como id, createdAt, uploadedByUserId.

//Esto te sirve para probar todo el flujo antes de conectar con la base de datos.
