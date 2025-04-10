import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


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
}


