import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.email) {
      res.send("missing email");
      return;
    }

    const user = await getUserByEmail(body.email);

    let newUser;
    if (user == null) {
      newUser = await createUser(body.email);
    }
    res.send({ user: user || newUser });
  } catch (err) {
    res.status(500);
    res.send({
      message: err,
    });
  }
};
