import { Request, Response } from "express";
import { createItem as dbCreateItem, getUserByEmail } from "../db";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { email, content } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404);
      res.send({ message: `user with email ${email} not found` });
      return;
    }

    const item = await dbCreateItem({ userID: user.id, content });
    res.send({ item });
  } catch (err) {
    res.status(500);
    if (err instanceof Error) {
      res.send({ message: err.message });
    }
  }
};
