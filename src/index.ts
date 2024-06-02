import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createItem, createUser, getUserByEmail } from "./db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.email) {
    res.send("missing email");
    return;
  }
  await createUser(body.email);
  res.send("created user");
});

app.post("/items", async (req: Request, res: Response) => {
  const { email, content } = req.body;

  const { id: userID } = await getUserByEmail(email);

  await createItem({ userID, content });
  res.send("created todo item");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
