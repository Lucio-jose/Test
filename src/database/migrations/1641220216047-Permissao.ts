import {MigrationInterface, QueryRunner} from "typeorm";

export class Permissao1641220216047 implements MigrationInterface {
    name = 'Permissao1641220216047'
 
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Permissao" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, CONSTRAINT "PK_78ec25941033109a7ce02ac938f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Permissao"`);
    }

}
