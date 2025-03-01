import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  email: { type: String, required: true }, 
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String},
  address: { type: String, required: true },
  additional: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
