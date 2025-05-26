import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/*
    Classe de validação de login para usuário por e-mail e senha.
*/

export class LoginInfoDTO {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

}