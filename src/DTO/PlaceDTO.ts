import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { PlaceType } from "../models/enum/PlaceType";
import { AddressDTO } from "./wrappersDTO/AddressDTO";
import { Type } from "class-transformer";


export class PlaceDTO {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsEnum(PlaceType)
    type!: PlaceType;

    @ValidateNested()
    @Type(() => AddressDTO)
    address!: AddressDTO;

}
