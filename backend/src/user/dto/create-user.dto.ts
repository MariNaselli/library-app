import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateUserDto {
    @IsString()
    nombre:string;

    @IsString()
    apellido:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsOptional()
    @IsString()
    rol?: string; //por defecto sera usuario pero lo dejamos como opcional

    @IsOptional()
    @IsBoolean()
    isActive?:boolean;//por defecto es true


}
