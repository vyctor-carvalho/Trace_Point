import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PlaceType } from "../models/enum/PlaceType"; // Verifique o caminho
import { AddressDTO } from "./wrappersDTO/AddressDTO"; // Verifique o caminho

/**
 * @class PlaceDTO
 * @description Data Transfer Object para informações de locais.
 */
export class PlaceDTO {

    /**
     * @property name
     * @description Nome do local.
     * Não pode estar vazio.
     */
    @IsNotEmpty()
    @IsString()
    name!: string;

    /**
     * @property type
     * @description Tipo do local (ex: cultural, gastronômico).
     * Deve ser um dos valores definidos no enum `PlaceType`.
     */
    @IsNotEmpty() // Adicionado IsNotEmpty assumindo que type é obrigatório
    @IsEnum(PlaceType)
    type!: PlaceType;

    /**
     * @property address
     * @description Objeto contendo os detalhes do endereço do local.
     * Será validado recursivamente.
     */
    @IsNotEmpty() // Adicionado IsNotEmpty assumindo que address é obrigatório
    @ValidateNested()
    @Type(() => AddressDTO)
    address!: AddressDTO;

    /**
     * @method getPostalCode
     * @description Retorna o código postal do endereço do local.
     * @returns {string} O código postal.
     */
    public getPostalCode(): string { return this.address.postalCode; } // Corrigido para postalCode

    /**
     * @method getNumberHouse
     * @description Retorna o número do imóvel do endereço do local.
     * @returns {number} O número do imóvel.
     */
    public getNumberHouse(): number { return this.address.numberHouse; }

    /**
     * @method getStreet
     * @description Retorna a rua/logradouro do endereço do local.
     * @returns {string} A rua.
     */
    public getStreet(): string { return this.address.street; }

    /**
     * @method getComplement
     * @description Retorna o complemento do endereço do local, se houver.
     * @returns {string | undefined} O complemento ou undefined.
     */
    public getComplement(): string | undefined { return this.address.complement; }
}