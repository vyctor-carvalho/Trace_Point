import { IsDate, IsNotEmpty, IsUUID } from  "class-validator";
import { Type } from "class-transformer";

export class VisitedDOT {

    @IsNotEmpty()
    @IsUUID()
    userId!: string;

    @IsNotEmpty()
    @IsUUID()
    placeId!: string;

    @IsDate()
    @Type(() => Date)
    visitDate!: Date;


}