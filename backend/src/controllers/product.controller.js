import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Category } from "../models/category.model.js";

const addProduct = asyncHandler(async (req, res) => {
    const { prodName, prodImage, prodPrice, prodDesc, category } = req.body;

    if ([prodName, prodImage, prodPrice, prodDesc, category].some((field) => field?.trim() === "")) {
        return res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
    }

    let categoryName = await Category.find({ name: category.toLowerCase() });
    console.log(categoryName);
    if (categoryName.length === 0) {
        categoryName = await Category.create({ name: category.toLowerCase() });
    }
    console.log(categoryName);
    const id = req.user._id;
    const product = await Product.create({
        prodName,
        prodImage,
        prodPrice,
        prodDesc,
        seller: id,
        prodCategory: categoryName._id
    });

    return res.status(200).json(new ApiResponse(200, product, "Product added successfully"));
});

const getProducts = asyncHandler(async (_, res) =>{
    const products = await Product.find();
    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
})

export { addProduct, getProducts };
