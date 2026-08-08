import gentoken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

const signup=async(req,res)=>{
    try {
        
        const {username,email,password}=req.body;
        const checkuserByUsername=await User.findOne({username});
        if(checkuserByUsername){
            return res.status(400).json({message:"Username Already Exist"})
        }
        const checkuserbyemail=await User.findOne({email});
        if(checkuserbyemail){
            return res.status(400).json({message:"Email Already Exists"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at leat 6 character"});
        }

        const hashpass=await bcrypt.hash(password,10);

        const user=await User.create({
            username,email,password:hashpass
        })

    //use this generate token here 
    const token=await gentoken(user._id); //mongodb store using user_id

    // store this token into the cokkie and the cokkie name "token"

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"none",
        secure:false
    })

    return res.status(201).json(user)



    } catch (error) {
        return res.status(500).json({message:`signup error ${error}`})
    }
}
export default signup

export const signin=async(req,res)=>{
    try {
        const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({message:"user does not exists"});
    }

    const ismatch=await bcrypt.compare(password,user.password);
    if(!ismatch){
        return res.status(400).json({message:"Password does not match"});
    }

    const token=await gentoken(user._id);

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:7*24*60*60*1000
    })
     return res.status(201).json(user)

    return res.status(200).json({message:"User login succesfully"});
    } catch (error) {
        return res.status(500).json({message:"Login failed"});
    }

}

export const signout=async(req,res)=>{
    try {

        res.clearCookie("token");
        return res.status(200).json({message:"Logout Succesfully"});
        
    } catch (error) {
        return res.status(500).json({message:"Logout not succesfull"});
    }
}