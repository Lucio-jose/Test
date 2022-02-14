import {MigrationInterface, QueryRunner} from "typeorm";

export class Role1642276736870 implements MigrationInterface {
    name = 'Role1642276736870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Role" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rolePermissao" ("roleId" uuid NOT NULL, "permissaoId" uuid NOT NULL, CONSTRAINT "PK_c89ce625cce5a6e211a07fbb062" PRIMARY KEY ("roleId", "permissaoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3dd48fe6574e0d8fa8b441c6d3" ON "rolePermissao" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_28c0867fa2d53872b1df792484" ON "rolePermissao" ("permissaoId") `);
        await queryRunner.query(`ALTER TABLE "rolePermissao" ADD CONSTRAINT "FK_3dd48fe6574e0d8fa8b441c6d32" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rolePermissao" ADD CONSTRAINT "FK_28c0867fa2d53872b1df7924845" FOREIGN KEY ("permissaoId") REFERENCES "Permissao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
 
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rolePermissao" DROP CONSTRAINT "FK_28c0867fa2d53872b1df7924845"`);
        await queryRunner.query(`ALTER TABLE "rolePermissao" DROP CONSTRAINT "FK_3dd48fe6574e0d8fa8b441c6d32"`);
        await queryRunner.query(`DROP INDEX "IDX_28c0867fa2d53872b1df792484"`);
        await queryRunner.query(`DROP INDEX "IDX_3dd48fe6574e0d8fa8b441c6d3"`);
        await queryRunner.query(`DROP TABLE "rolePermissao"`);
        await queryRunner.query(`DROP TABLE "Role"`);
    }

}
