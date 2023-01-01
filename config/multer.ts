import multer from "multer";

import { Request } from "express";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "uploads");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, file.originalname);
  },
});

const authorUploader = multer({
  storage: storage,
}).single("authorImg");

const bookUploader = multer({
  storage: storage,
}).single("coverImage");

export { authorUploader, bookUploader };
