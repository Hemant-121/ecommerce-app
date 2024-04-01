import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const isSeller = asyncHandler(async (req, _, next) => {
    if(req.user.role !== "seller"){
        throw new ApiError(401, "Only seller is allowed to add  delete and update the products")
    }
    next();
})