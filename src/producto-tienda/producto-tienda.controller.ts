/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ProductoTiendaService } from '../producto-tienda/producto-tienda.service';
import { TiendaDto } from 'src/tienda/tienda.dto';
import { TiendaEntity } from 'src/tienda/tienda.entity';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductoTiendaController {
   constructor(private readonly productoTiendaService: ProductoTiendaService){}

   @Post(':productoId/stores/:tiendaId')
   async addSTiendaToProducto(@Param('productoId') productoId: string, @Param('tiendaId') tiendaId: string){
       return await this.productoTiendaService.addTiendaToProducto(productoId, tiendaId);
   }

   @Get(':productoId/stores/:tiendaId')
   async findTiendaFromProducto(@Param('productoId') productoId: string, @Param('tiendaId') tiendaId: string){
       return await this.productoTiendaService.findTiendaFromProducto(productoId, tiendaId);
   }   

   @Get(':productoId/stores')
   async findTiendasFromProducto(@Param('productoId') productoId: string){
       return await this.productoTiendaService.findTiendasFromProducto(productoId);
   }

   @Put(':productoId/stores')
   async updateTiendasFromProducto(@Body() tiendasDto: TiendaDto[], @Param('productoId') productoId: string){
       const tiendas = plainToInstance(TiendaEntity, tiendasDto)
       return await this.productoTiendaService.updateTiendasFromProducto(productoId, tiendas);
   }
   
   @Delete(':productoId/stores/:tiendaId')
   @HttpCode(204)
   async deleteTiendaFromProducto(@Param('productoId') productoId: string, @Param('tiendaId') tiendaId: string){
       return await this.productoTiendaService.deleteTiendaFromProducto(productoId, tiendaId);
   }
}