import {MigrationInterface, QueryRunner} from "typeorm";

export class FileUser1643137785287 implements MigrationInterface {
    name = 'FileUser1643137785287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FileUser" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, "path" character varying NOT NULL, "typeId" uuid, "categorylId" uuid, CONSTRAINT "PK_78a89b8ecabd11871e05009390f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "FileUser" ADD CONSTRAINT "FK_0723f397a77be3ef0341687ecce" FOREIGN KEY ("typeId") REFERENCES "typeFile"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "FileUser" ADD CONSTRAINT "FK_57f80f65261b9b8919b0f80d082" FOREIGN KEY ("categorylId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FileUser" DROP CONSTRAINT "FK_57f80f65261b9b8919b0f80d082"`);
        await queryRunner.query(`ALTER TABLE "FileUser" DROP CONSTRAINT "FK_0723f397a77be3ef0341687ecce"`);
        await queryRunner.query(`DROP TABLE "FileUser"`);
    }

}
