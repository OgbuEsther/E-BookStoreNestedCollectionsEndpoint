import { Router } from "express";

import { authorUploader } from "../config/multer";
import {
  createAuthor,
  getAllAuthors,
  getOneAuthor,
  removeAuthor,
  updateAuthor,
} from "../controller/authorController";

const authorRouter = Router();

authorRouter.route("/").get(getAllAuthors);
authorRouter.route("/:authorID").get(getOneAuthor);
authorRouter.route("/new").post(authorUploader, createAuthor);
authorRouter.route("/update/:authorID").patch(authorUploader, updateAuthor);
authorRouter.route("/remove/:authorID").delete(removeAuthor);

export default authorRouter;
