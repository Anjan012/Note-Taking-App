import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        minlength: 6
    },
    avatar: {
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

userSchema.methods.generateToken = async function () {
    try {
        
        return jwt.sign({
            userId: this._id,
            email:this.email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:'4d'
        }
    )

    } catch (error) {
        console.log(`jwt: ${error}`)
    }
}

export const User = mongoose.model("User", userSchema);
