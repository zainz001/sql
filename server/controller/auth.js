import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
    try {
        const q = "SELECT * FROM users WHERE username = ?";
        const data = await new Promise((resolve, reject) => {
            db.query(q, [req.body.username], (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        if (data.length === 0) return res.status(403).json("User not found");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(404).json("Wrong credentials!");

        const token = jwt.sign({ id: data[0].id }, "secretKey");
        const { password, ...rest } = data[0];
        
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const Logout = (req, res) => {
    res.clearCookie('access_token',{secure:true , sameSite:"none"});
    res.status(200).json('User has been logged out!');
}

export const Signup = (req, res) => {
    // Check if user exists
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Check if user already exists
        if (data.length > 0) {
            return res.status(409).json("User already exists");
        }

        // Create new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); // Change Password to password
        const insert = "INSERT INTO users (username, email, password, coverpic) VALUES (?)";
        const values = [req.body.username, req.body.email, hashedPassword, req.body.coverpic];
    
        if (!req.body || !req.body.username || !req.body.email || !req.body.password || !req.body.coverpic) { // Change Password to password
            return res.status(400).json("Missing required fields");
        }
       
        db.query(insert, [values], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
    
            return res.status(200).json("User successfully created");
        });
    });
};
