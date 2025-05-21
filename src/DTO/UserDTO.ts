import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { LoginInfoDTO } from "./wrappersDTO/LoginInfoDTO";

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

    @IsEnum(["organizer", "visitor"])
    role!: "organizer" | "visitor";
    
}