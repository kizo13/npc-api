export enum DbEnums {
  NPC_TABLE = 'npc',
  NPC_COLUMN_ID = 'id',
  NPC_COLUMN_BLOB = 'blob',
  NPC_COLUMN_GENDER = 'gender',
  NPC_COLUMN_CLASS = 'class',
  NPC_COLUMN_AGE = 'age',
  NPC_COLUMN_RACE = 'race',
  NPC_COLUMN_CULTURE = 'culture',
  NPC_COLUMN_UPLOADER_ID = 'uploader_id',

  AVATAR_TABLE = 'avatar',
  AVATAR_COLUMN_ID = 'id',
  AVATAR_COLUMN_BLOB = 'blob',

  USER_TABLE = 'user',
  USER_COLUMN_ID = 'id',
  USER_COLUMN_USERNAME = 'username',
  USER_COLUMN_EMAIL = 'email',
  USER_COLUMN_PASSWORD = 'password',
  USER_COLUMN_AVATAR_ID = 'avatar_id',
  USER_COLUMN_ISACTIVE = 'is_active',
  USER_IDX_COLUMN_EMAIL = 'IDX_email',

  NOTE_TABLE = 'note',
  NOTE_COLUMN_ID = 'id',
  NOTE_COLUMN_NPC_ID = 'npc_id',
  NOTE_COLUMN_DESCRIPTION = 'description',
  NOTE_COLUMN_CREATED_BY = 'created_by',
  NOTE_COLUMN_MODIFIED_BY = 'modified_by',
  NOTE_COLUMN_CREATED_AT = 'created_at',
  NOTE_COLUMN_MODIFIED_AT = 'modified_at',
  NOTE_IDX_COLUMN_ID = 'IDX_id',
}
