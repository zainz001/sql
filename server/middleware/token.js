import jwt from 'jsonwebtoken';
export const verifyToken = (req, res) => {
    const token =  req.cookies.access_token;

    if (!token) {
        console.log("Token not present");
        return res.status(401).json("Unauthorized Token");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(403).json("Forbidden");
        }

        req.user = user;
        
    });
};
