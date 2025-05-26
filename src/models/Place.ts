import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"; // Adicionado JoinColumn

import { Address } from "./wrappers/Address"; // Verifique o caminho
import { PlaceType } from "./enum/PlaceType"; // Verifique o caminho
import { VisitedPlaces } from "./VisitedPlaces"; // Verifique o caminho
import { Event } from "./Event"; // Verifique o caminho

/**
 * @class Place
 * @description Entidade que representa um local cadastrado na aplicação.
 * Contém informações como nome, tipo, endereço e relações com visitas e eventos.
 */
@Entity("place")
export class Place {
    
    /**
     * @property id
     * @description Identificador único do local (UUID). Chave primária.
     */
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    /**
     * @property name
     * @description Nome do local.
     */
    @Column({ name: "name", type: "varchar", length: 40 })
    name!: string;

    /**
     * @property type
     * @description Tipo do local (ex: turístico, restaurante).
     * Controlado pelo enum PlaceType.
     */
    @Column({ 
        name: "type", 
        type: "enum", 
        enum: PlaceType, 
        default: PlaceType.turistc 
    })
    type!: PlaceType;

    /**
     * @property address
     * @description Detalhes do endereço do local. Embutido na tabela do local.
     */
    @Column(() => Address, { prefix: false })
    address!: Address;

    /**
     * @property visitedPlaces
     * @description Relação One-to-Many com os registros de visitas a este local.
     */
    @OneToMany(() => VisitedPlaces, (visitedPlaces) => visitedPlaces.place)
    visitedPlaces?: VisitedPlaces[];

    /**
     * @property event
     * @description Relação One-to-One com um evento que ocorre neste local (se houver).
     * O lado proprietário da relação (com JoinColumn) está na entidade Event.
     */
    @OneToOne(() => Event, (event) => event.place)
    event?: Event;
}