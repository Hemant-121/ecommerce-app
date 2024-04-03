import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js"; 

const addProduct = asyncHandler(async (req, res) => {
    const { prodName, prodImages, prodPrice, prodDesc, category, keywords, brand, attributes} = req.body;

    // Validate required fields
    if (!prodName || !prodPrice || !prodDesc || !category || !brand) {
        return res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
    }

    // Validate image
    if (!Array.isArray(prodImages) || prodImages.length === 0) {
        return res.status(400).json(new ApiResponse(400, {}, "At least one image is required"));
    }

    try {
        // Find or create category
        let categoryName = await Category.findOneAndUpdate(
            { name: category.toLowerCase() },
            { name: category.toLowerCase() },
            { upsert: true, new: true }
        );

        // Create product
        const product = await Product.create({
            prodName,
            prodImages,
            prodPrice,
            prodDesc,
            seller: req.user._id,
            prodCategory: categoryName._id,
            keywords,
            brand,
            attributes
        });

        // Update user's products field with the ID of the newly created product
        await User.findByIdAndUpdate(req.user._id, { $push: { products: product._id } });

        return res.status(200).json(new ApiResponse(200, product, "Product added successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
    }
});

const getProducts = asyncHandler(async (_, res) =>{
    const products = await Product.find();
    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

const selllerProducts =  asyncHandler(async(req,res) =>{
    const products = await Product.find({seller:req.user._id});
    return res.status(200).json(new ApiResponse(200, products, "Seller Products fetched successfully"));
});

export { addProduct, getProducts, selllerProducts };
