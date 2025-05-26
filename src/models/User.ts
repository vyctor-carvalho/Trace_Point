import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm"; // Removido JoinTable daqui

import { LoginInfo } from "./wrappers/LoginInfo"; // Verifique o caminho
import { UserRole } from "./enum/UserRole"; // Verifique o caminho
import { VisitedPlaces } from "./VisitedPlaces"; // Verifique o caminho
import { Event } from "./Event"; // Verifique o caminho

/**
 * @class User
 * @description Entidade que representa um usuário da aplicação.
 * Armazena informações pessoais, de login, papel (role), locais visitados e eventos agendados.
 */
@Entity("user")
export class User {

    /**
     * @property id
     * @description Identificador único do usuário (UUID). Chave primária.
     */
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    /**
     * @property name
     * @description Nome completo do usuário.
     */
    @Column({ name: "name", type: "varchar", length: 50 })
    name!: string;

    /**
     * @property userLogin
     * @description Informações de login (email e senha) do usuário. Embutido na tabela do usuário.
     */
    @Column(() => LoginInfo, { prefix: false })
    userLogin!: LoginInfo;

    /**
     * @property profilePick
     * @description URL da foto de perfil do usuário (opcional).
     */
    @Column({ name: "profile_pick", type: "varchar", length: 60, nullable: true })
    profilePick?: string;

    /**
     * @property role
     * @description Papel do usuário no sistema (ex: admin, visitor, organizer).
     * Controla o nível de acesso do usuário.
     */
    @Column({ 
        name: "role", 
        type: "enum", 
        enum: UserRole, 
        default: UserRole.visitor 
    })
    role!: UserRole;

    /**
     * @property visitedPlaces
     * @description Relação One-to-Many com os registros de locais visitados por este usuário.
     */
    @OneToMany(() => VisitedPlaces, (visitedPlaces) => visitedPlaces.user)
    visitedPlaces?: VisitedPlaces[];
    
    /**
     * @property event
     * @description Relação Many-to-Many com os eventos nos quais o usuário está inscrito (agendado).
     * Este é o lado inverso da relação, cuja tabela de junção 'booking' é gerenciada pela entidade `Event`.
     */
    @ManyToMany(() => Event, (event) => event.user)
    event?: Event[]; // @JoinTable removido daqui

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
     * @description Retorna a senha (hash) das informações de login do usuário.
     * @returns {string} A senha (hash) do usuário.
     */
    public getPassword(): string {
        return this.userLogin.password;
    }

    /**
     * @method setPassword
     * @description Define a senha (que será hasheada antes de salvar) nas informações de login do usuário.
     * @param {string} password - A nova senha (texto plano) a ser definida.
     */
    public setPassword(password: string): void {
        this.userLogin.password = password;
    }
}