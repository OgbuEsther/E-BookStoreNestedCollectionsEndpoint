import express, { Application, Request, Response } from "express";
import cors from "cors";
import bookRouter from "../router/bookRouter";
import authorRouter from "../router/authorRouter";
require("../config/db");

const port: number | string = process.env.port || 2056;

const server: Application = express();
server.use(express.json());
server.use(cors());

server.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json({
    message: "server is up and running",
  });
});

server.use("/author", authorRouter);
server.use("/books", bookRouter);

server.listen(port, () => {
  console.log(`server is up and running on port : ${port} `);
});
