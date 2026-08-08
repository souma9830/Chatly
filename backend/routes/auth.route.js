import express from "express";
import signup, { signin, signout } from "../controllers/auth.controller.js";
import User from "../models/user.model.js";

const authRouter=express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.get("/logout",signout)



export default authRouter;