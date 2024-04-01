import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    prodName: {
      type: String,
      required: true,
    },
    prodPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    prodDesc: {
      type: String,
      required: true,
    },

    prodImage: {
      type: String,
      required: true,
    },
    isStock: {
      type: Boolean,
      default: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prodReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
    prodCategory: 
        {
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
  },
  { timestamps: true }
);

export const Product = new mongoose.model("Product", productSchema);
