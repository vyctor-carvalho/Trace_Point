import { Column } from "typeorm";


export class Address {

    @Column({ name: "postal_code", type: "varchar", length: 10 })
    postalColde!: string;

    @Column({ name: "street", type: "varchar", length: 30 })
    street!: string;

    @Column({ name: "number_house", type: "varchar", length: 6 })
    numberHouse!: number;

    @Column({ name: "complement", type: "varchar", length: 100 })
    complement?: string;

}