import {MigrationInterface, QueryRunner} from "typeorm";

export class Curso1640931215525 implements MigrationInterface {
    name = 'Curso1640931215525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Curso" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, CONSTRAINT "PK_d7ee8dd2573d058f03ffadf0ee9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cursoDisciplina" ("cursoId" uuid NOT NULL, "disciplinaId" uuid NOT NULL, CONSTRAINT "PK_d64c6b46bae6f7688b62ce18c0d" PRIMARY KEY ("cursoId", "disciplinaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e80f0427d728af9cc56c5acff2" ON "cursoDisciplina" ("cursoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f70bb8137eefa14ef019d4130a" ON "cursoDisciplina" ("disciplinaId") `);
        await queryRunner.query(`CREATE TABLE "cursoClasse" ("cursoId" uuid NOT NULL, "classeId" uuid NOT NULL, CONSTRAINT "PK_df607cb743a89fa28f0c1d70818" PRIMARY KEY ("cursoId", "classeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f45e3b6099ee27d9cd76bb0fc" ON "cursoClasse" ("cursoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c494cacc9b986426a4d935691" ON "cursoClasse" ("classeId") `);
        await queryRunner.query(`CREATE TABLE "cursoProfissionalismo" ("cursoId" uuid NOT NULL, "profissionalismoId" uuid NOT NULL, CONSTRAINT "PK_408d41a6b86e1755bc8076de72f" PRIMARY KEY ("cursoId", "profissionalismoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df21e2916dda2f7500ba069210" ON "cursoProfissionalismo" ("cursoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_662ff8178f0743d8a307691794" ON "cursoProfissionalismo" ("profissionalismoId") `);
        await queryRunner.query(`ALTER TABLE "cursoDisciplina" ADD CONSTRAINT "FK_e80f0427d728af9cc56c5acff20" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cursoDisciplina" ADD CONSTRAINT "FK_f70bb8137eefa14ef019d4130a5" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cursoClasse" ADD CONSTRAINT "FK_7f45e3b6099ee27d9cd76bb0fc9" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cursoClasse" ADD CONSTRAINT "FK_7c494cacc9b986426a4d9356914" FOREIGN KEY ("classeId") REFERENCES "Classe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cursoProfissionalismo" ADD CONSTRAINT "FK_df21e2916dda2f7500ba069210a" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cursoProfissionalismo" ADD CONSTRAINT "FK_662ff8178f0743d8a307691794c" FOREIGN KEY ("profissionalismoId") REFERENCES "Profissionalismo"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cursoProfissionalismo" DROP CONSTRAINT "FK_662ff8178f0743d8a307691794c"`);
        await queryRunner.query(`ALTER TABLE "cursoProfissionalismo" DROP CONSTRAINT "FK_df21e2916dda2f7500ba069210a"`);
        await queryRunner.query(`ALTER TABLE "cursoClasse" DROP CONSTRAINT "FK_7c494cacc9b986426a4d9356914"`);
        await queryRunner.query(`ALTER TABLE "cursoClasse" DROP CONSTRAINT "FK_7f45e3b6099ee27d9cd76bb0fc9"`);
        await queryRunner.query(`ALTER TABLE "cursoDisciplina" DROP CONSTRAINT "FK_f70bb8137eefa14ef019d4130a5"`);
        await queryRunner.query(`ALTER TABLE "cursoDisciplina" DROP CONSTRAINT "FK_e80f0427d728af9cc56c5acff20"`);
        await queryRunner.query(`DROP INDEX "IDX_662ff8178f0743d8a307691794"`);
        await queryRunner.query(`DROP INDEX "IDX_df21e2916dda2f7500ba069210"`);
        await queryRunner.query(`DROP TABLE "cursoProfissionalismo"`);
        await queryRunner.query(`DROP INDEX "IDX_7c494cacc9b986426a4d935691"`);
        await queryRunner.query(`DROP INDEX "IDX_7f45e3b6099ee27d9cd76bb0fc"`);
        await queryRunner.query(`DROP TABLE "cursoClasse"`);
        await queryRunner.query(`DROP INDEX "IDX_f70bb8137eefa14ef019d4130a"`);
        await queryRunner.query(`DROP INDEX "IDX_e80f0427d728af9cc56c5acff2"`);
        await queryRunner.query(`DROP TABLE "cursoDisciplina"`);
        await queryRunner.query(`DROP TABLE "Curso"`);
    }

}
