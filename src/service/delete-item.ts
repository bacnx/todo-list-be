import { Request, Response } from "express";
import { deleteItem as dbDeleteItem, getItem } from "../db";

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { userID } = req.cookies;
    if (!userID) {
      res.status(401);
      res.send({ message: "missing userID" });
      return;
    }
    const { id } = req.body;

    let item = await getItem(id);
    if (!item || item.userID !== userID) {
      res.status(403);
      res.send({ message: "not allowed" });
      return;
    }

    item = await dbDeleteItem(id);
    res.send({ item });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.send({ message: err.message });
    }
  }
};
