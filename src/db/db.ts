import { Pool } from "pg";

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USERNAME,
//   // password: process.env.DB_PASSWORD,
//   password: "secret",
//   database: process.env.DB_NAME,
// });
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "secret",
  database: "root",
});

export default pool;
