import { IsNotEmpty, IsUUID } from "class-validator";

export class BookingDTO {

    @IsNotEmpty()
    @IsUUID()
    event_id!: string;

    @IsNotEmpty()
    @IsUUID()
    user_id!: string;

}