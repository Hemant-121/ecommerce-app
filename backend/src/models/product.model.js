import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    image: {
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
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
    category: [
        {
          type: Schema.Types.ObjectId,
          ref: "category",
          required: true,
        },
      ],
  },
  { timestamps: true }
);

export const Product = new mongoose.Model("Product", productSchema);
