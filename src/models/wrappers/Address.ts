import { Column } from "typeorm";

/**
 * @class Address
 * @description Entidade que representa os detalhes de um endereço.
 * Pode ser usada como uma entidade embutida (embedded) ou relacionada em outras entidades.
 */
export class Address {

    /**
     * @property postalCode
     * @description Código postal (CEP) do endereço.
     * Mapeado para a coluna 'postal_code' no banco de dados.
     */
    @Column({ name: "postal_code", type: "varchar", length: 10 })
    postalCode!: string;

    /**
     * @property street
     * @description Nome da rua ou logradouro.
     * Mapeado para a coluna 'street' no banco de dados.
     */
    @Column({ name: "street", type: "varchar", length: 30 })
    street!: string;

    /**
     * @property numberHouse
     * @description Número do imóvel no endereço.
     * Mapeado para a coluna 'number_house' no banco de dados.
     * (Nota: O tipo no decorator é "varchar", mas a propriedade é `number`. Verifique a consistência com o banco de dados; se for número, o tipo da coluna deveria ser numérico).
     */
    @Column({ name: "number_house", type: "varchar", length: 6 }) // Atenção ao tipo aqui se a propriedade é number
    numberHouse!: number;

    /**
     * @property complement
     * @description Complemento do endereço (opcional). Ex: apartamento, bloco.
     * Mapeado para a coluna 'complement' no banco de dados.
     */
    @Column({ name: "complement", type: "varchar", length: 100, nullable: true }) // Adicionado nullable: true por ser opcional
    complement?: string;
}