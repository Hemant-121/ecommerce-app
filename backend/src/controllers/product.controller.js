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

const getProduct = asyncHandler(async (req, res) =>{
    const id = req.params.id;
    const product = await Product.findById(id); // Remove the curly braces around _id
    if(!product){
        return res.status(400).json(new ApiResponse(400, {}, "Product Not Found"));
    }
    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});

const getCategory = asyncHandler(async (req, res) =>{
    const id = req.params.id;
    const category = await Category.findById(id); // Remove the curly braces around _id
    if(!category){
        return res.status(400).json(new ApiResponse(400, {}, "Category Not Found"));
    }
    return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
});


const updateProduct = asyncHandler(async (req, res) =>{
    const productId = req.params.id;
    const { prodName, prodImages, prodPrice, prodDesc, prodCategory, keywords, brand} = req.body;

    // Validate required fields
    if (!prodName || !prodPrice || !prodDesc || !prodCategory || !brand) {
        return res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
    }

    // Validate image
    if (!Array.isArray(prodImages) || prodImages.length === 0) {
        return res.status(400).json(new ApiResponse(400, {}, "At least one image is required"));
    }

    let categoryName = await Category.findOneAndUpdate(
        { name: prodCategory.toLowerCase() },
        { name: prodCategory.toLowerCase() },
        { upsert: true, new: true }
    );

    const options = { new: true }; 

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        prodName,
        prodImages,
        prodPrice,
        prodDesc,
        prodCategory: categoryName._id,
        keywords,
        brand
    }, options);

    if (!updatedProduct) {
      return res.status(400).json(new ApiResponse(400, {}, "Product Not Found"));
    }

    return res.status(200).json(new ApiResponse(200, updatedProduct, "Products updated successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
  
    // Delete the product from the database
    const deletedProduct = await Product.findByIdAndDelete(productId);
  
    if (!deletedProduct) {
      return res.status(404).json(new ApiResponse(404, {}, "Product not found"));
    }
  
    // Find the user who owns the product and remove the product ID from their products array
    const sellerId = deletedProduct.seller; // Assuming you have a userId field in your product schema
    const user = await User.findById(sellerId);
  
    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }
  
    user.products = user.products.filter((id) => id.toString() !== productId);
  
    await user.save();
  
    return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
  });
  

export { addProduct, getProducts, selllerProducts, getProduct, updateProduct, getCategory, deleteProduct };
