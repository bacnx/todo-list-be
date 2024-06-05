import { Request, Response } from "express";
import { getUser } from "../db";

export const getMe = async (req: Request, res: Response) => {
  try {
    const { userID } = req.cookies;
    if (!userID) {
      res.status(401);
      res.send({ message: "missing userID" });
      return;
    }

    const user = await getUser(userID);
    res.send({ user: user });
  } catch (err) {
    res.status(500);
    res.send({
      message: err,
    });
  }
};
