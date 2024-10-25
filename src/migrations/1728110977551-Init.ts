import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1728110977551 implements MigrationInterface {
    name = 'Init1728110977551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "description" character varying`);
    }

}
