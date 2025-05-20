import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1747755304546 implements MigrationInterface {
    name = 'GeneratedMigration1747755304546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."place_type_enum" AS ENUM('turistc', 'restaurant', 'museum', 'historic', 'market')`);
        await queryRunner.query(`CREATE TABLE "place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(40) NOT NULL, "type" "public"."place_type_enum" NOT NULL DEFAULT 'turistc', "postal_code" character varying(10) NOT NULL, "street" character varying(30) NOT NULL, "number_house" character varying(6) NOT NULL, "complement" character varying(100) NOT NULL, CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(40) NOT NULL, "event_date" TIMESTAMP NOT NULL, "description" character varying(150) NOT NULL, "place_id" uuid, CONSTRAINT "REL_de511946a8e3e052141b4ee3af" UNIQUE ("place_id"), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'visitor', 'organizer')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "profile_pick" character varying(60), "role" "public"."user_role_enum" NOT NULL DEFAULT 'visitor', "email" character varying(40) NOT NULL, "password" character varying(60) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visited_places" ("user_id" uuid NOT NULL, "place_id" uuid NOT NULL, "visit_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e024367cc56be7279e7de3cb952" PRIMARY KEY ("user_id", "place_id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("event_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_9eaa0bf62bfb88bb44694364242" PRIMARY KEY ("event_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_020993a41994bae310ecd6c17a" ON "booking" ("event_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_276896d1a1a30be6de9d7d43f5" ON "booking" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_de511946a8e3e052141b4ee3aff" FOREIGN KEY ("place_id") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visited_places" ADD CONSTRAINT "FK_3fb85f7bb73a3bddb0f6d10c590" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visited_places" ADD CONSTRAINT "FK_fd6b723b1ad7a11da1b5729a27c" FOREIGN KEY ("place_id") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_020993a41994bae310ecd6c17a5" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_020993a41994bae310ecd6c17a5"`);
        await queryRunner.query(`ALTER TABLE "visited_places" DROP CONSTRAINT "FK_fd6b723b1ad7a11da1b5729a27c"`);
        await queryRunner.query(`ALTER TABLE "visited_places" DROP CONSTRAINT "FK_3fb85f7bb73a3bddb0f6d10c590"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_de511946a8e3e052141b4ee3aff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_276896d1a1a30be6de9d7d43f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_020993a41994bae310ecd6c17a"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "visited_places"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TYPE "public"."place_type_enum"`);
    }

}
