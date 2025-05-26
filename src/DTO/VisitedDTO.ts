import { IsDate, IsNotEmpty, IsUUID } from  "class-validator";
import { Type } from "class-transformer";

/**
 * @class VisitedDTO
 * @description Data Transfer Object para registrar uma visita a um local.
 * (Nome original da classe era VisitedDOT, alterado para VisitedDTO por consistência).
 */
export class VisitedDTO { // Nome da classe alterado de VisitedDOT

    /**
     * @property userId
     * @description ID do usuário que realizou a visita.
     * Deve ser um UUID válido e não pode estar vazio.
     */
    @IsNotEmpty()
    @IsUUID()
    userId!: string;

    /**
     * @property placeId
     * @description ID do local que foi visitado.
     * Deve ser um UUID válido e não pode estar vazio.
     */
    @IsNotEmpty()
    @IsUUID()
    placeId!: string;

    /**
     * @property visitDate
     * @description Data e hora em que a visita ocorreu.
     * Deve ser uma data válida.
     */
    @IsNotEmpty() // Adicionado IsNotEmpty assumindo que visitDate é obrigatória
    @IsDate()
    @Type(() => Date)
    visitDate!: Date;
}