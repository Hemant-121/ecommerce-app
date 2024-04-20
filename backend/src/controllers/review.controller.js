import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"


const addReview = asyncHandler( async (req, res)=>{
    try {
        let {productId} = req.params;
        let {rating , comment} = req.body;
        const user = req.user

        const product = await Product.findById(productId);
        
        const review  = new Review({rating , comment, author:user._id, authorName:user.fullName});
        product.prodReview.push(review);
        user.reviews.push(product);
    
        await review.save();
        await product.save();   
        await user.save();   
        return res.status(200).json(new ApiResponse(200, {}, "Review successfully added"));
    } catch (error) {
        return res.status(409).json(new ApiError(401, "Error while adding review and comment" ));
    }
}) 

const getProductReviews = async (req, res) => {
    try {
        let {productId} = req.params;
       
        const product = await Product.findById(productId).populate('prodReview');
        // console.log(product.prodReview)

        return res.status(200).json(new ApiResponse(200, product.prodReview, "Products review successfully fetched"));
    } catch (error) {
        console.error("Error fetching cart products:", error);
        return res.status(500).json({ message: 'Could not fetch cart products', error: error.message });
    }
};

export {addReview, getProductReviews}