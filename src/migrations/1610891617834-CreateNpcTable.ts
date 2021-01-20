import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class CreateNpcTable1610891617834 implements MigrationInterface {
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
          },
          {
            name: db.NPC_COLUMN_BLOB,
            type: 'bytea',
            isNullable: false,
          },
          {
            name: db.NPC_COLUMN_GENDER,
            type: 'boolean',
          },
          {
            name: db.NPC_COLUMN_CLASS,
            type: 'varchar',
            length: '15',
          },
          {
            name: db.NPC_COLUMN_AGE,
            type: 'varchar',
            length: '15',
          },
          {
            name: db.NPC_COLUMN_RACE,
            type: 'varchar',
            length: '15',
          },
          {
            name: db.NPC_COLUMN_CULTURE,
            type: 'varchar',
            length: '15',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const table = await queryRunner.getTable('question');
    // const foreignKey = table.foreignKeys.find(
    //   (fk) => fk.columnNames.indexOf('questionId') !== -1,
    // );
    // await queryRunner.dropForeignKey('question', foreignKey);
    // await queryRunner.dropColumn('question', 'questionId');
    // await queryRunner.dropTable('answer');
    // await queryRunner.dropIndex('question', 'IDX_QUESTION_NAME');
    await queryRunner.dropTable(db.NPC_TABLE);
  }
}
