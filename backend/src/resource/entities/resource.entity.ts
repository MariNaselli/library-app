// resource.entity.ts
import { Category } from 'src/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
//@Entity() → le dice a TypeORM que esta clase representa una tabla en la base de datos.
export class Resource {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  //@PrimaryGeneratedColumn() → crea un ID autoincremental y lo marca como clave primaria.
  id: number; // ID autoincremental (clave primaria)

  @Column()
  //@Column() → le dice a TypeORM que ese campo debe ser una columna en la base de datos.
  title: string; // Título del recurso

  @Column()
  author: string; // Autor o autores

  @Column({ nullable: true }) //→ significa que ese campo puede quedar vacío.
  description?: string; // Descripción opcional

  @Column()
  type: 'book' | 'article' | 'magazine' | 'video' | 'document'; // Tipo de recurso

  @Column()
  categoryId: number; // ID de la categoría (relación con otra tabla, más adelante)

  @Column()
  fileUrl: string; // URL al archivo (PDF, video, etc.)

  @CreateDateColumn() //TypeORM pondrá automáticamente la fecha y hora actual al crear el registro
  createdAt: Date; // Fecha de alta en la plataforma

  @Column({ default: false }) //si no se le pasa valor, por defecto es false.
  isDeleted: boolean; // Campo para borrado lógico

  @ManyToOne(() => Category, (category) => category.resources, { eager: true })
  //Le decís a TypeORM: “Este recurso pertenece a UNA categoría”.
  //category.resources se refiere a la otra parte de la relación (en Category).
  //{ eager: true } --> Le pedís a TypeORM que te traiga automáticamente los datos de la categoría cuando consultes un recurso. O sea, no tenés que hacer otro findOne.
  @JoinColumn({ name: 'categoryId' })
  //Le decís: “La columna categoryId es la que usás para unir con la tabla categoría”.
  category: Category;
  //Es el campo que va a contener el objeto completo de la categoría asociada. Cuando pedís un recurso, además de los campos como title, también recibís category: { id, name, ... }.
}

// export class Resource {
//     id: number; // ID autoincremental (PostgreSQL lo gestiona automáticamente)
//     title: string; // Título del recurso
//     author: string; // Autor o autores
//     description?: string; // Descripción opcional
//     type: 'book' | 'article' | 'magazine' | 'video' | 'document'; // Tipo de recurso (obligatorio)
//     categoryId: number; // Relación con la categoría temática
//     fileUrl: string; // URL al archivo subido (PDF, video, etc.)
//     //coverUrl?: string; // Imagen de portada opcional
//     //publicationDate?: Date; // Fecha de publicación si aplica
//     //uploadedByUserId: number; // Quién subió el recurso
//     createdAt: Date; // Fecha de alta en la plataforma
//     //updatedAt: Date; // Última modificación
//     isDeleted: boolean; // Campo lógico para saber si fue eliminado (0/1)
//   }

//Después le vamos a ir agregando los decoradores de TypeORM como @Entity(), @Column(),
// @PrimaryGeneratedColumn(), etc.,
// para que esta clase se convierta en una entidad real que se refleje en la base de datos PostgreSQL.
