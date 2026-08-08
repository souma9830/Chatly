import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
dotenv.config();

const port = process.env.PORT;
const app=express();

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(port,()=>{
    connectdb();
    console.log(`Server running on ${port}`);
})