import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place"; // Verifique o caminho
import { User } from "./User"; // Verifique o caminho

/**
 * @class Event
 * @description Entidade que representa um evento na aplicação.
 * Contém detalhes do evento e se relaciona com um local (onde ocorre) e usuários (participantes/agendados).
 */
@Entity("event")
export class Event {

    /**
     * @property id
     * @description Identificador único do evento (UUID). Chave primária.
     */
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    /**
     * @property title
     * @description Título ou nome do evento.
     */
    @Column({ name: "title", type: "varchar", length: 40 })
    title!: string;

    /**
     * @property eventDate
     * @description Data e hora de ocorrência do evento.
     */
    @Column({ name: "event_date", type: "timestamp" })
    eventDate!: Date;

    /**
     * @property description
     * @description Descrição detalhada do evento (opcional).
     */
    @Column({ name: "description", type: "varchar", length: 150, nullable: true })
    description?: string;
    
    /**
     * @property user
     * @description Relação Many-to-Many com os usuários que estão agendados para este evento.
     * Esta entidade (Event) é a proprietária da relação e define a tabela de junção 'booking'.
     */
    @ManyToMany(() => User, (user) => user.event)
    @JoinTable({
        name: "booking", // Nome da tabela de junção
        joinColumn: { // Coluna nesta entidade (Event) que referencia a si mesma na tabela de junção
            name: "event_id", // Nome da coluna na tabela 'booking' que guarda o ID do Evento
            referencedColumnName: "id" // Nome da coluna na tabela 'event' (id do Evento)
        },
        inverseJoinColumn: { // Coluna na tabela de junção que referencia a outra entidade (User)
            name: "user_id", // Nome da coluna na tabela 'booking' que guarda o ID do Usuário
            referencedColumnName: "id" // Nome da coluna na tabela 'user' (id do Usuário)
        }
    })
    user?: User[];

    /**
     * @property place
     * @description Relação One-to-One com o local onde o evento ocorre.
     * Esta entidade (Event) possui a chave estrangeira 'place_id'.
     */
    @OneToOne(() => Place, (place) => place.event, { eager: true, cascade: true })
    @JoinColumn({ name: "place_id" }) // Define que a coluna 'place_id' nesta tabela (event) referencia Place.
    place!: Place;
}