import { IsNotEmpty, IsNumber, IsOptional, IsPostalCode, IsString } from "class-validator";


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