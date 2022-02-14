import {MigrationInterface, QueryRunner} from "typeorm";

export class School1643799367316 implements MigrationInterface {
    name = 'School1643799367316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "School" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "School" ADD "typeSchool" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "School" DROP COLUMN "typeSchool"`);
        await queryRunner.query(`ALTER TABLE "School" DROP COLUMN "email"`);
    }

}
