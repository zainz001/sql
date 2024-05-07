import { db } from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, decodedToken) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const userId = decodedToken.id; // Extract user ID from decoded token
        console.log(decodedToken);
        const q =
        userId !== undefined
          ? `SELECT p.*, u.user_id AS user_id, name, coverpic FROM posts AS p JOIN users AS u ON (u.user_id = p.user_id) WHERE p.user_id = ? `
          : `SELECT p.*, u.user_id AS user_id, name, coverpic FROM posts AS p JOIN users AS u ON (u.user_id = p.user_id)
      LEFT JOIN follows AS r ON (p.user_id = r.followee_id) WHERE r.follower_id = ? OR p.user_id = ?
      `;
console.log(userId);
      const values = [userId, userId]; // Use userId in both cases
      console.log("User ID:", userId);

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};


export const createPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        
        const q = "INSERT INTO posts(`discription`, `image`, `created_at`, `user_id`) VALUES (?)";
        const values = [
            req.body.discription,
            req.body.image,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ];
  
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created.");
        });
    });
};
