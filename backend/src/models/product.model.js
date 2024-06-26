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
    prodDesc: String,
    prodImages: [
      {
        type: String,
        required: true,
      },
    ],
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
    prodCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brand:{
      type: String,
    },
    keywords: [
      {
        type: String,
        required: true,
      },
    ],
    attributes: {
      type: Map,
      of: String,
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
