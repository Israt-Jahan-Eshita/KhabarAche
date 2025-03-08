import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import uploadRoutes from "./routes/upload.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4004;
const URI = process.env.MONGO_URI;


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => {
        console.error(`Error connecting to database: ${err}`);
        process.exit(1);
    });

app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes); 


app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
