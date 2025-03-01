import express from "express";
import authMiddleware from "../middleware/auth.js"; 
import Post from "../models/post.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, imageURL, price, description, address, additional } = req.body;
    const email = req.user.email; 

    const newPost = new Post({ email, title, imageURL, price, description, address, additional });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const posts = await Post.find({ email });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
