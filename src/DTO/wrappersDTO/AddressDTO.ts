import { IsNotEmpty, IsNumber, IsOptional, IsPostalCode, IsString } from "class-validator";

/**
 * @class AddressDTO
 * @description Data Transfer Object para informações de endereço.
 */
export class AddressDTO {

    /**
     * @property postalCode
     * @description Código postal do endereço (CEP).
     * Deve ser um CEP válido para o Brasil ("BR").
     * (Note: Nome original 'postalCode' foi corrigido para 'postalCode' para seguir convenção)
     */
    @IsNotEmpty()
    @IsPostalCode("BR")
    postalCode!: string; // Corrigido de postalCode

    /**
     * @property street
     * @description Nome da rua/logradouro.
     * Não pode estar vazio.
     */
    @IsNotEmpty()
    @IsString()
    street!: string;

    /**
     * @property numberHouse
     * @description Número do imóvel no endereço.
     * Deve ser um número e não pode estar vazio.
     */
    @IsNotEmpty()
    @IsNumber()
    numberHouse!: number;

    /**
     * @property complement
     * @description Complemento do endereço (opcional).
     * Ex: apartamento, bloco, casa, etc.
     */
    @IsOptional()
    @IsString()
    complement?: string;
}