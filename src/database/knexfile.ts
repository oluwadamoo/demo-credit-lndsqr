import { Knex } from "knex";

require('ts-node/register')
require('dotenv').config()
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      database: process.env.DB_NAME || "demo_credit_dev",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "2905@Omolara"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
    }
  },


  production: {
    client: "mysql2",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {

      tableName: "knex_migrations",
    }
  }

};

export default config;
