import pool from "./db";

export type User = {
  id: number;
  email: string;
};

export const createUser = async (email: string): Promise<User | null> => {
  const sql = `
    INSERT INTO users (email)
    VALUES ('${email}')
    RETURNING *
  `;

  const res = await pool.query<User>(sql);
  return res.rows.length ? res.rows[0] : null;
};

export const getUser = async (id: number): Promise<User | null> => {
  const sql = `
    SELECT * FROM users
    WHERE id = ${id}
  `;
  const result = await pool.query(sql);
  return result.rows.length ? result.rows[0] : null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const sql = `
    SELECT * FROM users
    WHERE email = '${email}'
  `;
  const result = await pool.query(sql);
  return result.rows.length ? result.rows[0] : null;
};
