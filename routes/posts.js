import express from "express";
import Post from "../models/post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, title, imageURL, description, price, address, additional } = req.body;

    if (!title || !imageURL || !price || !address) {
      return res.status(400).json({ message: "Title, imageURL, price, and address are required." });
    }

    const newPost = new Post({ email, title, imageURL, price, description, address, additional });
    await newPost.save();

    res.status(200).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); 
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
