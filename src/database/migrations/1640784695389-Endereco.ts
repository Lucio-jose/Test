import {MigrationInterface, QueryRunner} from "typeorm";

export class Endereco1640784695389 implements MigrationInterface {
    name = 'Endereco1640784695389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Endereco" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provincia_id" character varying NOT NULL, "municipio_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2a46cde15eb6d29d5562fc169d8" PRIMARY KEY ("id"))`);
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Endereco"`);
    }

}
