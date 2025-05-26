import { Column } from "typeorm";

/*  
    Entidade Login
*/

export class LoginInfo {

    @Column({ name: "email", type: "varchar", length: 40, unique: true })
    email!: string;

    @Column({ name: "password", type: "varchar", length: 60 })
    password!: string;

}