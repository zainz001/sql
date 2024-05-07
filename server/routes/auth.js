import express from "express"
import { Login,Logout,Signup } from "../controller/auth.js"
const router=express.Router()

router.post("/Login",Login)
router.post("/Signup",Signup)
router.post("/logout",Logout)

export default router