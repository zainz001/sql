import express from "express";

import userRoutes from "./routes/user.js"

import authRoutes from "./routes/auth.js"
//import commentRoutes from "./routes/comments.js"

//import postRoutes from "./routes/posts.js"
//import likeRoutes from "./routes/likes.js"
const app = express();
app.use(express.json());


app.use("/api/user", userRoutes);

//app.use("/api/comment",commentRoutes);

//app.use("/api/like",likeRoutes);

app.use("/api/auth", authRoutes);

//app.use("/api/posts",postRoutes);

app.listen(5000, () => {
    console.log("api Working");
})