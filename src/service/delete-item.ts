import { Request, Response } from "express";
import { deleteItem as dbDeleteItem, getItem } from "../db";

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies.userID) {
      res.status(401);
      res.send({ message: "missing userID" });
      return;
    }
    const userID = parseInt(cookies.userID);
    const { id } = req.params;

    let item = await getItem(parseInt(id));
    if (!item || item.user_id !== userID) {
      res.status(403);
      res.send({ message: "not allowed" });
      return;
    }

    item = await dbDeleteItem(parseInt(id));
    res.send({ item });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.send({ message: err.message });
    }
  }
};
