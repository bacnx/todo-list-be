import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  loginUser,
  createItem,
  listItem,
  deleteItem,
  updateItem,
  getMe,
  retrieveAllItem,
} from "./service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.post("/login", loginUser);
app.get("/me", getMe);

app.post("/items", createItem);
app.get("/items", listItem);
app.post("/items/:id", updateItem);
app.delete("/items/:id", deleteItem);
app.post("/retrieve", retrieveAllItem);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
