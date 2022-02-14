import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1642290448317 implements MigrationInterface {
    name = 'Test1642290448317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Test" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "roleId" uuid, CONSTRAINT "PK_257c543a36adff226a93de571a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Test" ADD CONSTRAINT "FK_6171ecfb9c894fed8f0f07b38f7" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Test" DROP CONSTRAINT "FK_6171ecfb9c894fed8f0f07b38f7"`);
        await queryRunner.query(`DROP TABLE "Test"`);
    }

}
