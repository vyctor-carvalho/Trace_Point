import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { PlaceType } from "../models/enum/PlaceType";
import { AddressDTO } from "./wrappersDTO/AddressDTO";
import { Type } from "class-transformer";

/*
    Classe Lugares
    Retorna a classe de validação AddressDTO (endereço)
*/
export class PlaceDTO {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsEnum(PlaceType)
    type!: PlaceType;

    @ValidateNested()
    @Type(() => AddressDTO)
    address!: AddressDTO;

    public getPostalCode() { return this.address.postalColde }

    public getNumberHouse() { return this.address.numberHouse }

    public getStreet() { return this.address.street }

    public getComplement() { return this.address.complement }

}
