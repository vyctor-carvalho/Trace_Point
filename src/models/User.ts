import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";

import { LoginInfo } from "./wrappers/LoginInfo";
import { UserRole } from "./enum/UserRole";
import { VisitedPlaces } from "./VisitedPlaces";
import { Event } from "./Event";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column({ name: "name", type: "varchar", length: 50 })
    name!: string;

    @Column(() => LoginInfo, { prefix: false })
    userLogin!: LoginInfo;

    @Column({ name: "profile_pick", type: "varchar", length: 60, nullable: true })
    profilePick?: string;

    @Column({ 
        name: "role", 
        type: "enum", 
        enum: UserRole, 
        default: UserRole.visitor 
    })
    role!: UserRole;

    @OneToMany(() => VisitedPlaces, (visitedPlaces) => visitedPlaces.user)
    visitedPlaces?: VisitedPlaces[];
    
    @ManyToMany(() => Event, (event) => event.user)
    event?: Event[];

    public getEmail() {
        return this.userLogin.email;
    }

    public setEmail(email: string) {
        this.userLogin.email = email;
    }

    public getPassword() {
        return this.userLogin.password;
    }

    public setPassword(password: string) {
        this.userLogin.password = password;
    }

}