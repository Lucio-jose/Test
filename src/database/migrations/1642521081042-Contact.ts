import {MigrationInterface, QueryRunner} from "typeorm";

export class Contact1642521081042 implements MigrationInterface {
    name = 'Contact1642521081042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_c0e04e1068848911421d27f2d3" UNIQUE ("userId"), CONSTRAINT "PK_9d0ea6f3557586cef53e954d13a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Contact" ADD CONSTRAINT "FK_c0e04e1068848911421d27f2d32" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contact" DROP CONSTRAINT "FK_c0e04e1068848911421d27f2d32"`);
        await queryRunner.query(`DROP TABLE "Contact"`);
    }

}
