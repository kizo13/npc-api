import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class CreateAvatarTable1611083185887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: db.AVATAR_TABLE,
        columns: [
          {
            name: db.AVATAR_COLUMN_ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: db.AVATAR_COLUMN_BLOB,
            type: 'bytea',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(db.AVATAR_TABLE);
  }
}
