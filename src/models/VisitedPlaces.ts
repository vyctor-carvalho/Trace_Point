import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./User"; // Verifique o caminho
import { Place } from "./Place"; // Verifique o caminho

/**
 * @class VisitedPlaces
 * @description Entidade que representa a relação entre um usuário e um local visitado.
 * Funciona como uma tabela de junção que armazena a data da visita.
 * Utiliza chaves primárias compostas (userId, placeId).
 */
@Entity("visited_places")
export class VisitedPlaces {
    
    /**
     * @property userId
     * @description ID do usuário que visitou o local. Parte da chave primária composta.
     */
    @PrimaryColumn("uuid", { name: "user_id" })
    userId!: string;

    /**
     * @property placeId
     * @description ID do local que foi visitado. Parte da chave primária composta.
     */
    @PrimaryColumn("uuid", { name: "place_id" })
    placeId!: string;

    /**
     * @property user
     * @description Relação Many-to-One com a entidade User.
     * Define o usuário que realizou a visita.
     */
    @ManyToOne(() => User, (user) => user.visitedPlaces, { onDelete: "CASCADE" })
    @JoinColumn({ name:"user_id" }) // Especifica a coluna de FK na tabela visited_places
    user!: User;

    /**
     * @property place
     * @description Relação Many-to-One com a entidade Place.
     * Define o local que foi visitado.
     */
    @ManyToOne(() => Place, (place) => place.visitedPlaces, { onDelete: 'CASCADE' })
    @JoinColumn({ name:"place_id" }) // Especifica a coluna de FK na tabela visited_places
    place!: Place;

    /**
     * @property visitDate
     * @description Data e hora em que a visita ocorreu.
     * O valor padrão é o timestamp atual no momento da inserção.
     */
    @Column({ name: "visit_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    visitDate!: Date;
}