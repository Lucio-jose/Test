import {MigrationInterface, QueryRunner} from "typeorm";

export class typeFile1642533813422 implements MigrationInterface {
    name = 'typeFile1642533813422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "typeFile" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, CONSTRAINT "PK_b4c528c0e94bf47f323dbb2dc4b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "typeFile"`);
    }

}
