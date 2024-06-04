import pool from "./db";

export type Item = {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  is_deleted: boolean;
};

export const createItem = async ({
  userID,
  content,
}: {
  userID: number;
  content: string;
}): Promise<Item> => {
  const sql = `
    INSERT INTO todo_items (user_id, content)
    VALUES (${userID}, '${content}')
    RETURNING *
  `;
  const res = await pool.query<Item>(sql);
  return res.rows[0];
};

export const getItem = async (id: number): Promise<Item> => {
  const sql = `
    SELECT * FROM todo_items
    WHERE id = ${id} AND is_deleted = false
  `;
  const res = await pool.query(sql);
  return res.rows[0];
};

export const listItemByUserID = async (userID: number): Promise<Item[]> => {
  const sql = `
    SELECT * FROM todo_items
    WHERE user_id = ${userID} AND is_deleted = false
  `;
  const res = await pool.query<Item>(sql);
  return res.rows;
};

export const updateItem = async ({
  id,
  content,
}: {
  id: number;
  content: string;
}): Promise<Item> => {
  const sql = `
    UPDATE todo_items SET content = '${content}'
    WHERE id = ${id} AND is_deleted = false
    RETURNING *
  `;
  const res = await pool.query<Item>(sql);
  return res.rows[0];
};

export const deleteItem = async (id: number): Promise<Item> => {
  const sql = `
    UPDATE todo_items SET is_deleted = true
    WHERE id = ${id} and is_deleted = false
    RETURNING *
  `;
  const res = await pool.query<Item>(sql);
  return res.rows[0];
};

export const retrieveAllItemByUserID = async (
  userID: number,
): Promise<Item[]> => {
  const sql = `
    UPDATE todo_items SET is_deleted = false
    WHERE user_id = ${userID} AND is_deleted = true
    RETURNING *
  `;
  const res = await pool.query<Item>(sql);
  return res.rows;
};
