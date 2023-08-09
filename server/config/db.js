require("dotenv").config();

module.exports= {
  development: {
    username: process.env.DB_USER_DEV || "postgres",
    password: process.env.DB_PASSWORD_DEV || "31121991",
    database: process.env.DB_NAME_DEV || "superheroes_dev",
    host: process.env.DB_HOST_DEV || "127.0.0.1",
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
