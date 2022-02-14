import {MigrationInterface, QueryRunner} from "typeorm";

export class Profissionalismo1640873075853 implements MigrationInterface {
    name = 'Profissionalismo1640873075853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Profissionalismo" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, CONSTRAINT "PK_24b1d11a63dded5838b5baec950" PRIMARY KEY ("id"))`);
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Profissionalismo"`);
    }

}
