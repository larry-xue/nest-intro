import { DataSource } from "typeorm";

// run mirgrations
// npx typeorm-ts-node-commonjs migration:run -d ormconfig.ts; 

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'bubble.db.elephantsql.com',
  port: 5432,
  username: 'jnpqvrdj',
  password: 'TyoFxGJ4fGZRmqjP8sjHDj_gMKICRnyM',
  database: 'jnpqvrdj',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: "custom_migration_table",
});
