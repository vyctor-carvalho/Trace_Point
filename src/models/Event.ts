import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place";
import { User } from "./User";

@Entity("event")
export class Event {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "title", type: "varchar", length: 40 })
    title!: string;

    @Column({ name: "event_date", type: "timestamp" })
    eventDate!: Date;

    @Column({ name: "description", type: "varchar", length: 150 })
    descriptin?: string;
    
    @ManyToMany(() => User, (User) => User.event)
    @JoinTable({
        name: "booking",
        joinColumn: {
            name: "event_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    user?: User[];

    @OneToOne(() => Place, (place) => place.event)
    @JoinColumn({ name: "place_id" })
    place?: Place

}