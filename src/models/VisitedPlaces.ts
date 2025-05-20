import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./User";
import { Place } from "./Place";

@Entity("visited_places")
export class VisitedPlaces {
    
    @PrimaryColumn("uuid", { name: "user_id" })
    userId!: string;

    @PrimaryColumn("uuid", { name: "place_id" })
    placeId!: string;

    @ManyToOne(() => User, (user) => user.visitedPlaces, { onDelete: "CASCADE" })
    @JoinColumn({ name:"user_id" })
    user!: User;

    @ManyToOne(() => Place, (place) => place.visitedPlaces, { onDelete: 'CASCADE' })
    @JoinColumn({ name:"place_id" })
    place!: Place;

    @Column({ name: "visit_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    visitDate?: Date;

}