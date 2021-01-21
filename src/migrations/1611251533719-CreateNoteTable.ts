import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class CreateNoteTable1611251533719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: db.NOTE_TABLE,

        columns: [
          {
            name: db.NOTE_COLUMN_ID,
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: db.NOTE_COLUMN_NPC_ID,
            type: 'smallint',
            isNullable: true,
          },
          {
            name: db.NOTE_COLUMN_DESCRIPTION,
            type: 'text',
            isNullable: true,
          },
          {
            name: db.NOTE_COLUMN_CREATED_BY,
            type: 'smallint',
          },
          {
            name: db.NOTE_COLUMN_MODIFIED_BY,
            type: 'smallint',
            isNullable: true,
          },
          {
            name: db.NOTE_COLUMN_CREATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: db.NOTE_COLUMN_MODIFIED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(db.NOTE_TABLE);
  }
}
