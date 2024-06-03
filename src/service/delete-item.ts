import { Request, Response } from "express";
import { deleteItem as dbDeleteItem } from "../db";

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const item = await dbDeleteItem(id);
    res.send({ item });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.send({ message: err.message });
    }
  }
};
