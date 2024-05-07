import jwt from 'jsonwebtoken';
import { db } from '../connect.js';


export const verifyToken = (req, res, next) => {
    const token =  req.cookies.accessToken;

    if (!token) {
        console.log("Token not present");
        return next(errorhandler(401, 'Unauthorized'));
    }

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) {
            console.error("Token verification failed:", err);
            return next(errorhandler(403, 'Forbidden'));
        }

        req.user = user;
        next();
    });
};