import knex from 'knex'

const env = process.env.NODE_ENV || 'development';
import knexfile from "../database/knexfile";



export default knex(knexfile[env])