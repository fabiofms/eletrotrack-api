require('dotenv').config()

const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const connectionString = 'postgres://vjharotrqntzui:f3ffb688430cdcb99b685ee272cdc858870b586e7bd8988cd997d7066dca35ee@ec2-3-216-89-250.compute-1.amazonaws.com:5432/dc0n9865s9sbp2'
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

module.exports = {pool}