import { IsNotEmpty, IsUUID } from "class-validator";

export class BookingDTO {

    @IsNotEmpty()
    @IsUUID()
    eventId!: string;

    @IsNotEmpty()
    @IsUUID()
    userId!: string;

}