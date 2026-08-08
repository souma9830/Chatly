import jwt from "jsonwebtoken";
const gentoken=async(id)=>{
    try {
        const token=await jwt.sign({id},process.env.jwt_secret,{expiresIn:"7D"});
        return token;
    } catch (error) {
        console.log("Json token error");
        
    }
}

export default gentoken;

/// make a token use this token everywhere 