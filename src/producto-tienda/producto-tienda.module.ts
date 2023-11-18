import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoTiendaService } from './producto-tienda.service';
import { ProductoEntity } from 'src/producto/producto.entity';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { ProductoTiendaController } from './producto-tienda.controller';

@Module({
  providers: [ProductoTiendaService],
  imports: [TypeOrmModule.forFeature([ProductoEntity, TiendaEntity])],
  controllers: [ProductoTiendaController],
})
export class ProductoTiendaModule {}
