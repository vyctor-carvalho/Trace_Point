import { IsNotEmpty, IsUUID } from "class-validator";

/**
 * @class BookingDTO
 * @description Data Transfer Object para informações de agendamento (reserva) em um evento.
 */
export class BookingDTO {

    /**
     * @property eventId
     * @description ID do evento a ser agendado.
     * Deve ser um UUID válido e não pode estar vazio.
     */
    @IsNotEmpty()
    @IsUUID()
    eventId!: string;

    /**
     * @property userId
     * @description ID do usuário que está realizando o agendamento.
     * Deve ser um UUID válido e não pode estar vazio.
     */
    @IsNotEmpty()
    @IsUUID()
    userId!: string;
}