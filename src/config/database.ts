import knex from 'knex'

const env = process.env.NODE_ENV || 'development';
const knexfile = require("../database/knexfile")
// const knex = require('knex')(knexfile[env])



export default knex(knexfile[env])