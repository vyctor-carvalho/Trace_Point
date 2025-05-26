import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"; // Adicionado IsOptional
import { Type } from "class-transformer";

/**
 * @class EventDTO
 * @description Data Transfer Object para informações de eventos.
 */
export class EventDTO {
    
    /**
     * @property title
     * @description Título do evento.
     * Não pode estar vazio.
     */
    @IsNotEmpty()
    @IsString()
    title!: string;

    /**
     * @property eventDate
     * @description Data e hora do evento.
     * Deve ser uma data válida e não pode estar vazia.
     */
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    eventDate!: Date;

    /**
     * @property description
     * @description Descrição detalhada do evento (opcional).
     */
    @IsOptional() // Adicionado para refletir `description?: string;`
    @IsString()
    description?: string;

    /**
     * @property place
     * @description ID do local onde o evento ocorrerá.
     * Deve ser um UUID válido.
     */
    @IsNotEmpty() // Adicionado IsNotEmpty assumindo que place é obrigatório
    @IsUUID()
    place!: string;
}