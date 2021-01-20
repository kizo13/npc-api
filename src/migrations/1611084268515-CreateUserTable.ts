import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class CreateUserTable1611084268515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: db.USER_TABLE,
        columns: [
          {
            name: db.USER_COLUMN_ID,
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: db.USER_COLUMN_USERNAME,
            type: 'varchar',
            length: '10',
          },
          {
            name: db.USER_COLUMN_EMAIL,
            type: 'varchar',
            length: '30',
            isUnique: true,
          },
          {
            name: db.USER_COLUMN_PASSWORD,
            type: 'varchar',
            length: '100',
          },
          {
            name: db.USER_COLUMN_AVATAR_ID,
            type: 'smallint',
            isNullable: true,
          },
          {
            name: db.USER_COLUMN_ISACTIVE,
            type: 'boolean',
          },
        ],
      }),
      true,
    );

    queryRunner.connection.query(
      `INSERT INTO "user" (${db.USER_COLUMN_USERNAME}, ${db.USER_COLUMN_EMAIL}, ${db.USER_COLUMN_PASSWORD}, ${db.USER_COLUMN_ISACTIVE}) VALUES ('kizo13', 'kizo13@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$SWJHdUFyV2RDNDV3bGFWMQ$yuyQ2/08XXVmfxi3vE8NCg', true)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(db.USER_TABLE);
  }
}
