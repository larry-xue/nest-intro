import { DataSource } from "typeorm";

// run mirgrations
// npx typeorm-ts-node-commonjs migration:run -d ormconfig.ts; 

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: "custom_migration_table",
});
