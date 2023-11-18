/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsIn} from 'class-validator';
export class ProductoDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;
 
 @IsString()
 @IsNotEmpty()
 @IsIn(['Perecedero', 'No perecedero'])
 readonly tipo: string;
 
 @IsString()
 @IsNotEmpty()
 readonly precio: string;
}