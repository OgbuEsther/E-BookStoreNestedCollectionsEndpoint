import bookModel from "../model/bookModel";

import cloudinary from "../config/cloudinary";

import { Request, Response } from "express";

import mongoose from "mongoose";
import authorModel from "../model/authorModel";

//general get
const getAllBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const all = await bookModel.find();
    return res.status(200).json({
      message: "gotten all books successfully ",
      data: all,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while trying to get all books",
      data: error,
    });
  }
};

//single get

const getOneBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const one = await bookModel.findById(req.params.bookID);
    return res.status(200).json({
      message: "gotten one book successfully ",
      data: one,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while trying to get one book",
      data: error,
    });
  }
};

const createBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, coverImage, category, authorName, summary, ISBN } = req.body;

    const isbn1 = Math.floor(Math.random() * 10000);
    const isbn2 = Math.floor(Math.random() * 10000);
    const isbn3 = Math.floor(Math.random() * 10000);
    const isbn4 = Math.floor(Math.random() * 10000);

    const myAuthor = await authorModel.findById(req.params.authorBooksID);

    const cloudImage = await cloudinary.uploader.upload(req?.file!.path);

    const newBook = await bookModel.create({
      title,
      coverImage: coverImage ? cloudImage.secure_url : title.charAt(0),
      category,
      authorName: myAuthor?.authorName,
      summary,
      ISBN: `${isbn1}-${isbn2}-${isbn3}-${isbn4}`,
    });

    myAuthor?.books.push(new mongoose.Types.ObjectId(newBook._id));
    myAuthor?.save();

    return res.status(201).json({
      message: "new book uploaded successfully",
      data: newBook,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while trying to create new book",
      data: error,
    });
  }
};

//delete method

const removeBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const removeOne = await bookModel.findByIdAndRemove(
      req.params.authorBooksID
    );
    return res.status(200).json({
      message: "deleted a book successfully ",
      data: removeOne,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while trying to create new book",
      data: error,
    });
  }
};

export { getAllBooks, getOneBook, createBooks, removeBook };
