// resource.entity.ts
export class Resource {
    id: number; // ID autoincremental (PostgreSQL lo gestiona automáticamente)
    title: string; // Título del recurso
    author: string; // Autor o autores
    description?: string; // Descripción opcional
    type: 'book' | 'article' | 'magazine' | 'video' | 'document'; // Tipo de recurso (obligatorio)
    categoryId: number; // Relación con la categoría temática
    fileUrl: string; // URL al archivo subido (PDF, video, etc.)
    coverUrl?: string; // Imagen de portada opcional
    publicationDate?: Date; // Fecha de publicación si aplica
    uploadedByUserId: number; // Quién subió el recurso
    createdAt: Date; // Fecha de alta en la plataforma
    updatedAt: Date; // Última modificación
    isDeleted: boolean; // Campo lógico para saber si fue eliminado (0/1)
  }

  //Después le vamos a ir agregando los decoradores de TypeORM como @Entity(), @Column(), 
  // @PrimaryGeneratedColumn(), etc., 
  // para que esta clase se convierta en una entidad real que se refleje en la base de datos PostgreSQL.
  