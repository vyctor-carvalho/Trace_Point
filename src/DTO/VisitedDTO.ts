import { IsDate, IsNotEmpty, IsUUID } from  "class-validator";

export class VisitedDOT {

    @IsNotEmpty()
    @IsUUID()
    userId!: string;

    @IsNotEmpty()
    @IsUUID()
    placeId!: string;

    @IsDate()
    visitDate?: Date;


}