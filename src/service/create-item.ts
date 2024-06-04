import { Request, Response } from "express";
import { createItem as dbCreateItem } from "../db";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { userID } = req.cookies;
    if (!userID) {
      res.status(401);
      res.send({ message: "missing userID" });
      return;
    }

    const { content } = req.body;
    const item = await dbCreateItem({ userID, content });
    res.send({ item });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.send({ message: err.message });
    }
  }
};
