import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPasswordColumn1698072570253 implements MigrationInterface {
    name = 'AddUserPasswordColumn1698072570253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
