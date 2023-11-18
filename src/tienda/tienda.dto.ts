/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class TiendaDto {
   @IsString()
   @IsNotEmpty()
   readonly nombre: string;

   @IsString()
   @IsNotEmpty()
   @Matches(/^[A-Z]{3}$/)
   readonly ciudad: string;

   @IsString()
   @IsNotEmpty()
   readonly direccion: string;
}