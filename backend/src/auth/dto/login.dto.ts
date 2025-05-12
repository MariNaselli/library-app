import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail({}, {message: 'El email no es válido'})
    email: string;

    @IsString()
    @MinLength(6, {message: 'La contraseña debe contener al menos seis carácteres'})
    password: string;
}