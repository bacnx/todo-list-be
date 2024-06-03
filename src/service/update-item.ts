import { Request, Response } from "express";
import { updateItem as dbUpdateItem } from "../db";

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const item = await dbUpdateItem({ id: parseInt(id), content });
    res.send({ item });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.send({ message: err.message });
    }
  }
};
