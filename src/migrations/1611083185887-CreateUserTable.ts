import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class CreateUserTable1611083185887 implements MigrationInterface {
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

    await queryRunner.createIndex(
      db.USER_TABLE,
      new TableIndex({
        name: db.USER_IDX_COLUMN_EMAIL,
        columnNames: [db.USER_COLUMN_EMAIL],
      }),
    );

    await queryRunner.createForeignKey(
      db.USER_TABLE,
      new TableForeignKey({
        columnNames: [db.USER_COLUMN_AVATAR_ID],
        referencedColumnNames: [db.AVATAR_COLUMN_ID],
        referencedTableName: db.AVATAR_TABLE,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(db.AVATAR_TABLE);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.AVATAR_COLUMN_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.AVATAR_TABLE, foreignKey);
    await queryRunner.dropColumn(db.USER_TABLE, db.USER_COLUMN_AVATAR_ID);
    // await queryRunner.dropTable('answer');
    await queryRunner.dropIndex(db.USER_TABLE, db.USER_IDX_COLUMN_EMAIL);
    await queryRunner.dropTable(db.USER_TABLE);
  }
}
