import dotenv from 'dotenv';
import { resolve } from 'path';
import pg from 'pg';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

pool.query('SELECT NOW()')
  .then(() => console.log('✅ Banco de dados conectado!'))
  .catch((err) => console.error('❌ Erro ao conectar no banco:', err.message));

export default pool;