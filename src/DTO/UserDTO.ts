import { IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"; 
import { Type } from "class-transformer";

import { LoginInfoDTO } from "./wrappersDTO/LoginInfoDTO"; 
import { UserRole } from "../models/enum/UserRole"; 

/**
 * @class UserDTO
 * @description Data Transfer Object para informações de usuários.
 */
export class UserDTO {
    
    /**
     * @property name
     * @description Nome completo do usuário.
     * Não pode estar vazio.
     */
    @IsNotEmpty()
    @IsString()
    name!: string;

    /**
     * @property userLogin
     * @description Objeto contendo as informações de login (email e senha) do usuário.
     * Será validado recursivamente.
     */
    @IsNotEmpty()
    @Type(() => LoginInfoDTO)
    @ValidateNested()
    userLogin!: LoginInfoDTO;

    /**
     * @property profilePick
     * @description URL da foto de perfil do usuário (opcional).
     */
    @IsOptional()
    @IsString()
    // @IsUrl() // Considere adicionar @IsUrl() se for sempre uma URL
    profilePick?: string;

    /**
     * @property role
     * @description Papel (nível de acesso) do usuário.
     * Deve ser 'visitor' ou 'organizer'. Admins são criados por outros meios.
     */
    @IsNotEmpty() // Adicionado IsNotEmpty assumindo que role é obrigatório
    @IsIn([UserRole.visitor, UserRole.organizer])
    role!: UserRole;

    /**
     * @method getEmail
     * @description Retorna o email das informações de login do usuário.
     * @returns {string} O email do usuário.
     */
    public getEmail(): string {
        return this.userLogin.email;
    }
    
    /**
     * @method setEmail
     * @description Define o email nas informações de login do usuário.
     * @param {string} email - O novo email a ser definido.
     */
    public setEmail(email: string): void {
        this.userLogin.email = email;
    }

    /**
     * @method getPassword
     * @description Retorna a senha (em texto plano, antes do hash) das informações de login do usuário.
     * @returns {string} A senha do usuário.
     */
    public getPassword(): string {
        return this.userLogin.password;
    }

    /**
     * @method setPassword
     * @description Define a senha (em texto plano) nas informações de login do usuário.
     * @param {string} password - A nova senha a ser definida.
     */
    public setPassword(password: string): void {
        this.userLogin.password = password;
    }
}