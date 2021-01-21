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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(db.USER_TABLE);
  }
}
