import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1668786327878 implements MigrationInterface {
    name = 'createTables1668786327878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "debitedId" uuid, "creditedId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" integer NOT NULL DEFAULT '100', CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "accountId" uuid, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_42bba679e348de51a699fb0a80" UNIQUE ("accountId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d8930679fe7311f99aaa48126f2" FOREIGN KEY ("debitedId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d10af9b3af85d8ce603d4863f8f" FOREIGN KEY ("creditedId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d10af9b3af85d8ce603d4863f8f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d8930679fe7311f99aaa48126f2"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
