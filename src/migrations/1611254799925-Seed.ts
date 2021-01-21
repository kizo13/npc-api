import { MigrationInterface, QueryRunner } from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class Seed1611254799925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.connection.query(
      `INSERT INTO "user" (${db.USER_COLUMN_USERNAME}, ${db.USER_COLUMN_EMAIL}, ${db.USER_COLUMN_PASSWORD}, ${db.USER_COLUMN_ISACTIVE}) VALUES ('kizo13', 'kizo13@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$SWJHdUFyV2RDNDV3bGFWMQ$yuyQ2/08XXVmfxi3vE8NCg', true)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.connection.query(
      `DELETE FROM "${db.USER_TABLE}" WHERE ${db.USER_COLUMN_EMAIL} = 'kizo13@gmail.com'`,
    );
  }
}
