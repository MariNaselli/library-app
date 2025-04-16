import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Resource } from 'src/resource/entities/resource.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Resource, (resource) => resource.category)
  //Le decís a TypeORM: “Una categoría puede tener muchos recursos”
  //resource.category es la propiedad inversa, o sea: en la entidad Resource, eso apunta a la categoría a la que pertenece.
  resources: Resource[];

  
}


