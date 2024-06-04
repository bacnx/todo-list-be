import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.email) {
      res.send("missing email");
      return;
    }

    let user = await getUserByEmail(body.email);
    if (user == null) {
      user = await createUser(body.email);
    }

    res.cookie("userID", user?.id, { maxAge: 60 * 60 * 1000 });
    res.send({ user: user });
  } catch (err) {
    res.status(500);
    res.send({
      message: err,
    });
  }
};
