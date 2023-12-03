module.exports = {
  type: 'postgres',
  host: 'bubble.db.elephantsql.com',
  port: 5432,
  username: 'jnpqvrdj',
  password: 'TyoFxGJ4fGZRmqjP8sjHDj_gMKICRnyM',
  database: 'jnpqvrdj',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
