import mongoose from "mongoose";

const connectdb=async ()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB connect succesfullly");
        
    } catch (error) {
        console.log("Mongo DB not connected");
        
    }
}

export default connectdb


















