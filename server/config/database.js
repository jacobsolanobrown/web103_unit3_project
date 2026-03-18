// import dotenv from 'dotenv';
// dotenv.config({ path: '../../.env' });
// console.log('PASSWORD:', process.env.PGPASSWORD)
// import './config/dotenv.js'
import pg from 'pg';

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false },
}

export const pool = new pg.Pool(config)