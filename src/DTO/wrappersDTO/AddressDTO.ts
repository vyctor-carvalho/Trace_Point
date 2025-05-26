import { IsNotEmpty, IsNumber, IsOptional, IsPostalCode, IsString } from "class-validator";

/*
    Classe de validação de endereço por código postal, rua, número da casa e complemento.
*/


export class AddressDTO {

    @IsNotEmpty()
    @IsPostalCode("BR")
    postalColde!: string;

    @IsNotEmpty()
    @IsString()
    street!: string;

    @IsNotEmpty()
    @IsNumber()
    numberHouse!: number;

    @IsOptional()
    @IsString()
    complement?: string;

}