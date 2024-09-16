import dotenv from "dotenv";
import express, { Request, Response } from "express";

//For env File
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Root message from node.js, hello world");
});
app.listen(port, () => {
  console.log(`Visit http://localhost:${port}`);
});
