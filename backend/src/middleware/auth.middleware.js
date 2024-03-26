import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Retrieve access token from cookies or authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        // Check if token exists
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        // Verify and decode access token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        // Find user associated with the decoded token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        // Check if user exists
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        // Set user object in request for further middleware
        req.user = user;
        next();
    } catch (error) {
        // Handle errors during token verification
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
