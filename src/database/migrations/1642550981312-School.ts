import {MigrationInterface, QueryRunner} from "typeorm";

export class School1642550981312 implements MigrationInterface {
    name = 'School1642550981312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "School" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, "nif" character varying NOT NULL, "numberStudents" smallint NOT NULL, "numberEmployee" smallint NOT NULL, "enderecoId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_9d02131a9366ffdb5f2889ef6b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schoolCurso" ("schoolId" uuid NOT NULL, "cursoId" uuid NOT NULL, CONSTRAINT "PK_9bea77a53899b3be82a0400aa10" PRIMARY KEY ("schoolId", "cursoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c6aab7a10a09270773b82bfca4" ON "schoolCurso" ("schoolId") `);
        await queryRunner.query(`CREATE INDEX "IDX_49e8cbea4e6970aef7a89d0478" ON "schoolCurso" ("cursoId") `);
        await queryRunner.query(`ALTER TABLE "School" ADD CONSTRAINT "FK_0ccdeb158bc5558ec4a4f0014dd" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "School" ADD CONSTRAINT "FK_c7503b0428d6395ff71cfb156f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schoolCurso" ADD CONSTRAINT "FK_c6aab7a10a09270773b82bfca48" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schoolCurso" ADD CONSTRAINT "FK_49e8cbea4e6970aef7a89d04785" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schoolCurso" DROP CONSTRAINT "FK_49e8cbea4e6970aef7a89d04785"`);
        await queryRunner.query(`ALTER TABLE "schoolCurso" DROP CONSTRAINT "FK_c6aab7a10a09270773b82bfca48"`);
        await queryRunner.query(`ALTER TABLE "School" DROP CONSTRAINT "FK_c7503b0428d6395ff71cfb156f9"`);
        await queryRunner.query(`ALTER TABLE "School" DROP CONSTRAINT "FK_0ccdeb158bc5558ec4a4f0014dd"`);
        await queryRunner.query(`DROP INDEX "IDX_49e8cbea4e6970aef7a89d0478"`);
        await queryRunner.query(`DROP INDEX "IDX_c6aab7a10a09270773b82bfca4"`);
        await queryRunner.query(`DROP TABLE "schoolCurso"`);
        await queryRunner.query(`DROP TABLE "School"`);
    }

}
