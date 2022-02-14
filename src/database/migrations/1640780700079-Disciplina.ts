import {MigrationInterface, QueryRunner} from "typeorm";

export class Disciplina1640780700079 implements MigrationInterface {
    name = 'Disciplina1640780700079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Disciplina" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, CONSTRAINT "PK_112d1c80f90b5637df1732d61f4" PRIMARY KEY ("id"))`);
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Disciplina"`);
    }

}
