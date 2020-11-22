const { Client } = require('pg');
// Setup postgresql connection
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'estagio',
  password: '123456',
  port: 5432
})
const connectDB = async () => {
  try {
    await client.connect();
    console.log('Postgresql Connected...');
    return client;
  } catch(err){
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
