import authorModel from "../model/authorModel";
import cloudinary from "../config/cloudinary";

import { Request, Response } from "express";

//General Get
const getAllAuthors = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getAll = await authorModel.find();

    return res.status(200).json({
      message: "gotten all data successfully",
      data: getAll,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to get the details of all authors",
      data: error,
    });
  }
};

//Single Get

const getOneAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const getOne = await authorModel.findById(req.params.authorID);
    return res.status(200).json({
      message: "gotten single data successfully",
      data: getOne,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to get the details of one author",
      data: error,
    });
  }
};

//post

const createAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { authorName, bio, authorImg, books } = req.body;
    const cloudImage = await cloudinary.uploader.upload(req?.file!.path);

    const newAuthor = await authorModel.create({
      authorName,
      bio,
      authorImg: cloudImage.secure_url,

      books,
    });

    return res.status(201).json({
      message: "new author created",
      data: newAuthor,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "failed to create a new author",
      data: error,
    });
  }
};

//delete method
const removeAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deleteAuthor = await authorModel.findByIdAndRemove(
      req.params.authorID
    );

    return res.status(200).json({
      message: "successfully removed an author",
      data: deleteAuthor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to create a new author",
      data: error,
    });
  }
};

//update method

const updateAuthor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const cloudImage = await cloudinary.uploader.upload(req?.file!.path);
    const { authorName, bio, authorImg } = req.body;

    const updating = await authorModel.findByIdAndUpdate(
      req.params.authorID,
      {
        authorName: authorName,
        bio: `thanks for visiting my page ${bio}`,
        authorImg: req.file ? cloudImage.secure_url : authorName.charAt(0),
      },
      { new: true }
    );

    return res.status(200).json({
      message: "updated an author",
      data: updating,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to create a new author",
      data: error,
    });
  }
};

export {
  getAllAuthors,
  getOneAuthor,
  createAuthor,
  updateAuthor,
  removeAuthor,
};
