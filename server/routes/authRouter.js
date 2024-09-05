const express=require("express");
const router=express.Router()
const {login,register,checkAuth,session,logout}=require("../controllers/authController")


router.post("/login",login);
router.post("/register",register)
router.get("/session",checkAuth,session)
router.get("/logout",logout);
module.exports=router;