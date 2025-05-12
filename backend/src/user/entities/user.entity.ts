import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true }) //Esto significa que no se pueden registrar dos usuarios con el mismo email. PostgreSQL, a través de TypeORM, va a lanzar un error automáticamente si intentamos guardar otro usuario con un email que ya exista.
    email: string;

    @Column()
    password: string;

    @Column({ default: 'usuario' }) //Esto indica que si no se define un rol al crear el usuario, por defecto será "usuario".
    rol: string;

    @Column({ default: true })
    isActive: boolean;


    @CreateDateColumn()
    createdAt: Date;
  }