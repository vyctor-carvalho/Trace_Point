import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { LoginInfoDTO } from "./wrappersDTO/LoginInfoDTO";
import { UserRole } from "../models/enum/UserRole";

export class UserDTO {
    
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @Type(() => LoginInfoDTO)
    @ValidateNested()
    userLogin!: LoginInfoDTO;

    @IsOptional()
    @IsString()
    profilePick?: string;

    @IsIn([UserRole.visitor, UserRole.organizer])
    role!: UserRole;

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