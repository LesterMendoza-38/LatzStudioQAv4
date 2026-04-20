const { Pool } = require('pg');

const config = {
  user: 'postgres',           // Tu usuario de Postgres
  host: '127.0.0.1',
  database: 'Latz_Studio',
  password: 'AdminManager1', 
  port: 5432,
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

module.exports = pool;