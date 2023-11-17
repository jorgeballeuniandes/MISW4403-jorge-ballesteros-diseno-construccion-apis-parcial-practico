/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { faker } from '@faker-js/faker';

let productosList = [];

describe('MuseumService', () => {
 let service: ProductoService;
 let repository: Repository<ProductoEntity>;
 const seedDatabase = async () => {
   repository.clear();
   productosList = [];
   for (let i = 0; i < 5; i++) {
     const producto: ProductoEntity = await repository.save({
       nombre: faker.lorem.sentence(),
       tipo: faker.lorem.sentence(),
       precio: faker.lorem.sentence(),
     });
     productosList.push(producto);
   }
 };

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [ProductoService],
   }).compile();

   service = module.get<ProductoService>(ProductoService);
   repository = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity));
   await seedDatabase();
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('create should return a new producto', async () => {
   const producto: ProductoEntity = {
     id: '',
     nombre: faker.lorem.sentence(),
     tipo: faker.lorem.sentence(),
     precio: faker.lorem.sentence(),
     tiendas: [],
   };
   const newProducto: ProductoEntity = await service.create(producto);
   expect(newProducto).not.toBeNull();
   const storedProducto: ProductoEntity = await repository.findOne({where: {id: newProducto.id}})
   expect(storedProducto).not.toBeNull();
   expect(storedProducto.nombre).toEqual(newProducto.nombre);
   expect(storedProducto.tipo).toEqual(newProducto.tipo);
   expect(storedProducto.precio).toEqual(newProducto.precio);
 });

 it('update should modify a producto', async () => {
   const producto: ProductoEntity = productosList[0];
   producto.nombre = 'Nuevo nombre';
   producto.tipo = 'Nuevo tipo';
   const updateProducto: ProductoEntity = await service.update(producto.id, producto);
   expect(updateProducto).not.toBeNull();
   const storedProducto: ProductoEntity = await repository.findOne({ where: { id: producto.id } })
   expect(storedProducto).not.toBeNull();
   expect(storedProducto.nombre).toEqual(producto.nombre)
   expect(storedProducto.tipo).toEqual(producto.tipo)
 });

 it('update should throw an exception for an invalid producto', async () => {
   let producto: ProductoEntity = productosList[0];
   producto = {
     ...producto, nombre: 'Nuevo nombre', tipo: 'Nuev tipo'
   };
   await expect(() => service.update("0", producto)).rejects.toHaveProperty('message', 'No se encuentra ningún producto con este id')
 }); 

 it('delete should throw an exception for an invalid producto', async () => {
  const producto: ProductoEntity = productosList[0];
  await expect(() => service.delete("0")).rejects.toHaveProperty('message', 'No se encuentra ningún producto con este id')
});

});