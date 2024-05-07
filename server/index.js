import express from "express";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

import postsRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Set up middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // Allow credentials
}));

// Define routes
app.use("/api/user", userRoutes);

app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);

// Start the server
app.listen(5000, () => {
    console.log("API server is running on port 5000");
});
