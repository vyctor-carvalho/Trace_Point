import { Column } from "typeorm";

/**
 * @class LoginInfo
 * @description Classe que encapsula as informações de login (email e senha) de um usuário.
 * Destinada a ser embutida em outras entidades (como User). Não é uma tabela separada.
 */
export class LoginInfo { // Se for um embeddable, idealmente marcaria com @ChildEntity ou seria apenas uma classe normal

    /**
     * @property email
     * @description Endereço de email do usuário para login. Deve ser único.
     */
    @Column({ name: "email", type: "varchar", length: 40, unique: true })
    email!: string;

    /**
     * @property password
     * @description Senha do usuário (armazenada como hash).
     */
    @Column({ name: "password", type: "varchar", length: 60 })
    password!: string;
}