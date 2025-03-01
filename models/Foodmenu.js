import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  email: { type: String, required: true }, 
  title: { type: String, required: true }, 
  img: { type: String, required: true }, 
  description: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  address: { type: String, required: true }, 
  additional: { type: String }, 
  createdAt: { type: Date, default: Date.now }, 
});

const Post = mongoose.model("foods", postSchema);

export default Post;
