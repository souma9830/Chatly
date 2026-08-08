import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT;
const app=express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter)

app.listen(port,()=>{
    connectdb();
    console.log(`Server running on ${port}`);
})