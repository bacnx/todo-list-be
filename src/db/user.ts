import pool from "./db";

export type User = {
  id: number;
  email: string;
};

export const createUser = async (email: string) => {
  const sql = `
    INSERT INTO users (email)
    VALUES ('${email}')
  `;

  await pool.query(sql);
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const sql = `
    SELECT * FROM users
    WHERE email = '${email}'
  `;
  const result = await pool.query(sql);
  return result.rows[0];
};
