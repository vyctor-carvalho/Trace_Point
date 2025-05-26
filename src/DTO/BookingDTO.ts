import { IsNotEmpty, IsUUID } from "class-validator";

/*
    Classe Reserva
    Faz referencia com Eventos e usuários
*/

export class BookingDTO {

    @IsNotEmpty()
    @IsUUID()
    eventId!: string;

    @IsNotEmpty()
    @IsUUID()
    userId!: string;

}