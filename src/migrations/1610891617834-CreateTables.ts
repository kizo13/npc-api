import { AgeEnums } from 'src/_shared/enums/age.enums';
import { CultureEnums } from 'src/_shared/enums/culture.enums';
import { RaceEnums } from 'src/_shared/enums/race.enums';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { DbEnums as db } from '../_shared/enums/database.enums';

export class CreateTables1610891617834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // AVATAR TABLE
    await queryRunner.createTable(
      new Table({
        name: db.AVATAR_TABLE,
        columns: [
          {
            name: db.AVATAR_COLUMN_ID,
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: db.AVATAR_COLUMN_BLOB,
            type: 'bytea',
            isNullable: false,
          },
          {
            name: db.NPC_COLUMN_CREATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // USER TABLE
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
            isUnique: true,
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
            name: db.USER_COLUMN_ISACTIVE,
            type: 'boolean',
          },
          {
            name: db.USER_COLUMN_REFRESH_TOKEN,
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // NPC TABLE
    await queryRunner.createTable(
      new Table({
        name: db.NPC_TABLE,
        columns: [
          {
            name: db.NPC_COLUMN_ID,
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
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
            type: 'text',
            isArray: true,
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_AGE,
            type: 'enum',
            enum: Object.values(AgeEnums),
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_RACE,
            type: 'enum',
            enum: Object.values(RaceEnums),
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_CULTURE,
            type: 'enum',
            enum: Object.values(CultureEnums),
            isNullable: true,
          },
          {
            name: db.NPC_COLUMN_CREATED_AT,
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: db.NPC_COLUMN_MODIFIED_AT,
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // NOTE TABLE
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
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: db.NOTE_COLUMN_DESCRIPTION,
            type: 'text',
            isNullable: true,
          },
          {
            name: db.NOTE_COLUMN_NAME,
            type: 'varchar',
            length: '40',
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
            isNullable: true,
          },
          {
            name: db.NOTE_COLUMN_ISPRIVATE,
            type: 'boolean',
          },
        ],
      }),
      true,
    );

    // NAME TABLE
    await queryRunner.createTable(
      new Table({
        name: db.NAME_TABLE,
        columns: [
          {
            name: db.NAME_COLUMN_ID,
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: db.NAME_COLUMN_CULTURE,
            type: 'varchar',
            length: '15',
          },
          {
            name: db.NAME_COLUMN_MALE_FIRSTNAMES,
            type: 'text',
          },
          {
            name: db.NAME_COLUMN_FEMALE_FIRSTNAMES,
            type: 'text',
          },
          {
            name: db.NAME_COLUMN_SURNAMES,
            type: 'text',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // AVATAR FK
    await queryRunner.addColumn(
      db.AVATAR_TABLE,
      new TableColumn({
        name: db.AVATAR_COLUMN_UPLOADER_ID,
        type: 'smallint',
      }),
    );

    await queryRunner.createForeignKey(
      db.AVATAR_TABLE,
      new TableForeignKey({
        columnNames: [db.AVATAR_COLUMN_UPLOADER_ID],
        referencedColumnNames: [db.USER_COLUMN_ID],
        referencedTableName: db.USER_TABLE,
        onDelete: 'CASCADE',
      }),
    );

    // USER FK
    await queryRunner.addColumn(
      db.USER_TABLE,
      new TableColumn({
        name: db.USER_COLUMN_AVATAR_ID,
        type: 'smallint',
        isNullable: true,
        isUnique: true,
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

    // NPC FK
    await queryRunner.addColumn(
      db.NPC_TABLE,
      new TableColumn({
        name: db.NPC_COLUMN_UPLOADER_ID,
        type: 'smallint',
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

    // NOTE FK
    await queryRunner.addColumn(
      db.NOTE_TABLE,
      new TableColumn({
        name: db.NOTE_COLUMN_NPC_ID,
        type: 'smallint',
      }),
    );

    await queryRunner.createForeignKey(
      db.NOTE_TABLE,
      new TableForeignKey({
        columnNames: [db.NOTE_COLUMN_NPC_ID],
        referencedColumnNames: [db.NPC_COLUMN_ID],
        referencedTableName: db.NPC_TABLE,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      db.NOTE_TABLE,
      new TableColumn({
        name: db.NOTE_COLUMN_CREATED_BY_ID,
        type: 'smallint',
      }),
    );

    await queryRunner.createForeignKey(
      db.NOTE_TABLE,
      new TableForeignKey({
        columnNames: [db.NOTE_COLUMN_CREATED_BY_ID],
        referencedColumnNames: [db.USER_COLUMN_ID],
        referencedTableName: db.USER_TABLE,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      db.NOTE_TABLE,
      new TableColumn({
        name: db.NOTE_COLUMN_MODIFIED_BY_ID,
        type: 'smallint',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      db.NOTE_TABLE,
      new TableForeignKey({
        columnNames: [db.NOTE_COLUMN_MODIFIED_BY_ID],
        referencedColumnNames: [db.USER_COLUMN_ID],
        referencedTableName: db.USER_TABLE,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const user_table = await queryRunner.getTable(db.USER_TABLE);
    const avatar_table = await queryRunner.getTable(db.AVATAR_TABLE);
    const npc_table = await queryRunner.getTable(db.NPC_TABLE);

    // AVATAR_COLUMN_UPLOADER_ID
    const avatar_uploader_foreignKey = user_table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.AVATAR_COLUMN_UPLOADER_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.USER_TABLE, avatar_uploader_foreignKey);
    await queryRunner.dropColumn(db.USER_TABLE, db.AVATAR_COLUMN_UPLOADER_ID);

    // USER_COLUMN_AVATAR_ID
    const avatar_foreignKey = avatar_table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.USER_COLUMN_AVATAR_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.AVATAR_TABLE, avatar_foreignKey);
    await queryRunner.dropColumn(db.AVATAR_TABLE, db.USER_COLUMN_AVATAR_ID);

    // NPC_COLUMN_UPLOADER_ID
    const npc_uploader_foreignKey = user_table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.NPC_COLUMN_UPLOADER_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.USER_TABLE, npc_uploader_foreignKey);
    await queryRunner.dropColumn(db.USER_TABLE, db.NPC_COLUMN_UPLOADER_ID);

    // NOTE_COLUMN_NPC_ID
    const npc_id_foreignKey = npc_table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.NOTE_COLUMN_NPC_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.NPC_TABLE, npc_id_foreignKey);
    await queryRunner.dropColumn(db.NPC_TABLE, db.NOTE_COLUMN_NPC_ID);

    const note_createdby_foreignKey = user_table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.NOTE_COLUMN_CREATED_BY_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.USER_TABLE, note_createdby_foreignKey);
    await queryRunner.dropColumn(db.USER_TABLE, db.NOTE_COLUMN_CREATED_BY_ID);

    const note_modifiedby_foreignKey = user_table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(db.NOTE_COLUMN_MODIFIED_BY_ID) !== -1,
    );
    await queryRunner.dropForeignKey(db.USER_TABLE, note_modifiedby_foreignKey);
    await queryRunner.dropColumn(db.USER_TABLE, db.NOTE_COLUMN_MODIFIED_BY_ID);

    await queryRunner.dropTable(db.AVATAR_TABLE);
    await queryRunner.dropTable(db.USER_TABLE);
    await queryRunner.dropTable(db.NPC_TABLE);
    await queryRunner.dropTable(db.NOTE_TABLE);
  }
}
