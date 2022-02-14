import {MigrationInterface, QueryRunner} from "typeorm";

export class Classe1640776145481 implements MigrationInterface {
    name = 'Classe1640776145481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Classe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" smallint NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1ecc4575af711ba0ed094dd26a8" PRIMARY KEY ("id"))`);
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Classe"`);
    }

}
