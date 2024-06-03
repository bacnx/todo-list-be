import { Request, Response } from "express";
import { listItemByUserID } from "../db";

export const listItem = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;
    const items = await listItemByUserID(userID);
    res.send({ items });
  } catch (err) {
    res.status(500);
    const message = err instanceof Error ? err.message : "known error";
    res.send({ message });
  }
};
