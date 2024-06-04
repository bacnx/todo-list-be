import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  loginUser,
  createItem,
  listItem,
  deleteItem,
  updateItem,
} from "./service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.post("/login", loginUser);

app.post("/items", createItem);
app.get("/items", listItem);
app.post("/items/:id", updateItem);
app.delete("/items", deleteItem);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
