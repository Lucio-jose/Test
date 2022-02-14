import {MigrationInterface, QueryRunner} from "typeorm";

export class Login1642522154401 implements MigrationInterface {
    name = 'Login1642522154401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Login" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying NOT NULL, "contactId" uuid, CONSTRAINT "REL_b1f7044943635c478bba494c93" UNIQUE ("contactId"), CONSTRAINT "PK_5f13afd170e4a02c00a68bfe4c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Login" ADD CONSTRAINT "FK_b1f7044943635c478bba494c937" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Login" DROP CONSTRAINT "FK_b1f7044943635c478bba494c937"`);
        await queryRunner.query(`DROP TABLE "Login"`);
    }

}
