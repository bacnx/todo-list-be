import { Request, Response } from "express";
import { updateItem as dbUpdateItem, getItem } from "../db";

export const updateItem = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies.userID) {
      res.status(401);
      res.send({ message: "missing userID" });
      return;
    }
    const userID = parseInt(cookies.userID);
    const { id } = req.params;
    const { content } = req.body;

    let item = await getItem(parseInt(id));
    if (item.user_id !== userID) {
      res.status(403);
      res.send({ message: "not allowed" });
      return;
    }

    item = await dbUpdateItem({ id: parseInt(id), content });
    res.send({ item });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.send({ message: err.message });
    }
  }
};
