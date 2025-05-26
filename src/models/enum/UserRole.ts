/**
 * @enum UserRole
 * @description Define os diferentes papéis (níveis de acesso) que um usuário pode ter na aplicação.
 */
export enum UserRole {

    /**
     * @member admin
     * @description Papel de administrador, com acesso total ao sistema.
     */
    admin = "admin",

    /**
     * @member visitor
     * @description Papel de visitante, com acesso limitado a funcionalidades básicas.
     */
    visitor = "visitor", 

    /**
     * @member organizer
     * @description Papel de organizador, com permissões para gerenciar eventos e locais.
     */
    organizer = "organizer"
}