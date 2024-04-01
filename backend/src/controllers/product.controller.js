import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Category } from "../models/category.model.js";

const addProduct = asyncHandler( async(req, res)=> {
    const {prodName, prodImage, prodPrice, prodDesc, category} = req.body;

    if ([prodName, prodImage, prodPrice, prodDesc, category].some((field) => field?.trim === "")) {
        // throw new ApiError(400, "All fields are required");
        return res.status(201).json(new ApiResponse(401, {}, "All fields are required")); 
    }

    let categoryName = await Category.find({name: category})
    if (categoryName.length == 0 || categoryName === undefined) {
        categoryName = await Category.create({name: category});
    }
    
    const product = await Product.create({
        prodName,
        prodImage,
        prodPrice,
        prodDesc,
        seller: req.user._id,
        prodCategory: categoryName[0]._id
    })

    return res
    .status(200)
    .json( new ApiResponse(200, product, "Product added successfully"))
})

export { addProduct };