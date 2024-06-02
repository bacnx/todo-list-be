import pool from "./db";

export type Item = {
  id: number;
  userID: number;
  content: string;
  createdAt: Date;
  isDeleted: boolean;
};

export const createItem = async ({
  content,
  userID,
}: {
  content: string;
  userID: number;
}) => {
  const sql = `
    INSERT INTO todo_items (user_id, content)
    VALUES (${userID}, '${content}')
  `;
  await pool.query(sql);
};
