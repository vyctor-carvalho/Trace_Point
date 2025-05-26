import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Type } from "class-transformer";

/*
    Classe Eventos
*/

export class EventDTO {
    
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    eventDate!: Date;

    @IsString()
    description?: string;

    @IsUUID()
    place!: string;

}