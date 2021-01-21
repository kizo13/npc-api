import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class CreateNpcTable1611084268515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: db.NPC_TABLE,
        columns: [
          {
            name: db.NPC_COLUMN_ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: db.NPC_COLUMN_BLOB,
            type: 'bytea',
            isNullable: false,
          },
          {
            name: db.NPC_COLUMN_GENDER,
            type: 'enum',
            enum: ['MALE', 'FEMALE'],
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_CLASS,
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_AGE,
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_RACE,
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_CULTURE,
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_UPLOADER_ID,
            type: 'smallint',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      db.USER_TABLE,
      new TableIndex({
        name: db.NOTE_IDX_COLUMN_ID,
        columnNames: [db.NOTE_COLUMN_ID],
      }),
    );

    await queryRunner.createForeignKey(
      db.NPC_TABLE,
      new TableForeignKey({
        columnNames: [db.NPC_COLUMN_UPLOADER_ID],
        referencedColumnNames: [db.USER_COLUMN_ID],
        referencedTableName: db.USER_TABLE,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(db.USER_TABLE);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.USER_COLUMN_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.USER_TABLE, foreignKey);
    await queryRunner.dropColumn(db.NPC_TABLE, db.NPC_COLUMN_UPLOADER_ID);
    // await queryRunner.dropTable('answer');
    await queryRunner.dropIndex(db.NPC_TABLE, db.NOTE_IDX_COLUMN_ID);
    await queryRunner.dropTable(db.NPC_TABLE);
  }
}
