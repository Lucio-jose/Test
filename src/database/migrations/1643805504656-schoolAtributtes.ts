import {MigrationInterface, QueryRunner} from "typeorm";

export class schoolAtributtes1643805504656 implements MigrationInterface {
    name = 'schoolAtributtes1643805504656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "School" ALTER COLUMN "numberEmployee" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "School" ALTER COLUMN "numberEmployee" SET NOT NULL`);
    }

}
