import mongoose from "mongoose";

interface books {
  title: string;
  coverImage: string;
  category: string;
  authorName: string;
  summary: string;
  ISBN: string;
}

interface iBooks extends books, mongoose.Document {}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  category: {
    type: String,
  },
  authorName: {
    type: String,
  },
  summary: {
    type: String,
  },
  ISBN: {
    type: String,
  },
});

const bookModel = mongoose.model<iBooks>("bookCollections", bookSchema);

export default bookModel;
