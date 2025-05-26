import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @class LoginInfoDTO
 * @description Data Transfer Object para informações de login do usuário.
 */
export class LoginInfoDTO {
    
    /**
     * @property email
     * @description Email do usuário para login.
     * Deve ser um email válido e não pode estar vazio.
     */
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    /**
     * @property password
     * @description Senha do usuário para login.
     * Não pode estar vazia.
     */
    @IsNotEmpty()
    @IsString()
    password!: string;
}