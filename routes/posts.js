import express from "express";
import Post from "../models/post.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { email, title, imageURL, description, price, address, additional } = req.body;

    if (!email || !title || !imageURL || !price || !address) {
      return res.status(400).json({ message: "Email, title, imageURL, price, and address are required." });
    }

    const newPost = new Post({ email, title, imageURL, price, description, address, additional });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { email } = req.query; 
    let posts;

    if (email) {
      posts = await Post.find({ email }); 
    } else {
      posts = await Post.find(); 
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
