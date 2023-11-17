import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  precio: string;
  @Column()
  tipo: string;
}
