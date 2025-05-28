import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDefaultAdminUserSeed1748434178882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user" (
                id,
                name,
                profile_pick,
                role,
                email,
                "password"
            ) VALUES (
                '9dfce170-5094-436f-9413-f5afc769a75e',
                'Admin User',
                'https://avatar/icone-de-perfil-de-avatar-padrao',
                'admin',
                'admin@example.com',
                '$2b$10$yG9D2ihkLL6hTh5KCw/l5.BqAqJ3i49GIvksxCBStGSMEJtTHS2ey'
            ) 
        `);
        console.info("INFO: Default admin user seeded successfully.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "user" WHERE email = 'admin@example.com'
        `);
        console.info("INFO: Default admin user removed successfully.");
    }
}
