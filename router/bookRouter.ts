import { Router } from "express";

import { bookUploader } from "../config/multer";
import {
  createBooks,
  getAllBooks,
  getOneBook,
} from "../controller/bookController";

const bookRouter = Router();

bookRouter.route("/all").get(getAllBooks);
bookRouter.route("/:bookID").get(getOneBook);
bookRouter.route("/new/:authorBooksID").post(bookUploader, createBooks);

export default bookRouter;
