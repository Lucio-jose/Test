import {MigrationInterface, QueryRunner} from "typeorm";

export class schoolEditting1643802970774 implements MigrationInterface {
    name = 'schoolEditting1643802970774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "School" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "School" DROP COLUMN "typeSchool"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "School" ADD "typeSchool" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "School" ADD "email" character varying NOT NULL`);
    }

}
