import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Address } from "./wrappers/Address";
import { PlaceType } from "./enum/PlaceType";
import { VisitedPlaces } from "./VisitedPlaces";
import { Event } from "./Event";


@Entity("place")
export class Place {
    
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "name", type: "varchar", length: 40 })
    name!: string;

    @Column({ 
        name: "type", 
        type: "enum", 
        enum: PlaceType, 
        default: PlaceType.turistc 
    })
    type!: PlaceType;

    @Column(() => Address, { prefix: false })
    address!: Address;

    @OneToMany(() => VisitedPlaces, (visitedPlaces) => visitedPlaces.place)
    visitedPlaces?: VisitedPlaces[];

    @OneToOne(() => Event, (event) => event.place)
    event?: Event

}