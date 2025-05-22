import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";


export class EventDTO {
    
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsDate()
    eventDate!: Date;

    @IsString()
    description?: string;

    @IsUUID()
    place!: string;

}