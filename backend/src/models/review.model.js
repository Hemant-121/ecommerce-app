import mongoose, { Mongoose, Schema } from "mongoose";

const reviewSchema = new Schema({
    rating:{
        type:Number,
        min:0,
        max:5

    },
    comment:{
        type:String,
        trim:true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    authorName:{
        type: String,
        required: true
    }
} , {timestamps:true})

export const Review = mongoose.model('Review' , reviewSchema);
