import mongoose from "mongoose";

const localURL = "mongodb://0.0.0.0:27017/TODOAPI";

mongoose.connect(localURL);
mongoose.connection
  .on("open", () => {
    console.log(`database connected`);
  })
  .once("error", () => {
    console.log(`failed to connect`);
  });
