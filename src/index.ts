import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()
const app: Application = express();
const port = process.env.PORT || 8080



app.get("/", (req: Request, res: Response) => {
  res.send("Hi I'm working")
})

app.listen(port, () => {

  console.log(`server started at http://localhost:${port}`);
});
