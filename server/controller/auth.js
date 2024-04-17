import { db } from "../connect.js"

export const Login = (req, res) => {




}
export const Logout = (req, res) => {

    c


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
        const hashedPassword = bcryptjs.hashSync(req.body.Password, salt);
        const insert = "INSERT INTO users (username, email, password, coverpic) VALUES (?)";
        const values = [req.body.username, req.body.email, hashedPassword, req.body.coverpic];
    
        if (!req.body || !req.body.username || !req.body.email || !req.body.Password || !req.body.coverpic) {
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