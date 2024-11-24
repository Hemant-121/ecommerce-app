// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/AsyncHandler.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//     try {
//         // Retrieve access token from cookies or authorization header
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
//         // Check if token exists
//         if (!token) {
//             // throw new ApiError(401, "Unauthorized request");
//             res.status(200).json(401 , {}, "you are not Logged in");
//         }
    
//         // Verify and decode access token
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
//         // Find user associated with the decoded token
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
//         // Check if user exists
//         if (!user) {
//             // throw new ApiError(401, "Invalid Access Token");
//             res.status(200).json(401 , {}, "you are not Logged in");
//         }
    
//         // Set user object in request for further middleware
//         req.user = user;
//         next();
//     } catch (error) {
//         // Handle errors during token verification
//         throw new ApiError(401, error?.message || "Invalid access token");
//     }
// });





import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Retrieve access token from cookies or authorization header
        const token = req?.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ", "");

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "You are not logged in. Token missing or invalid.",
            });
        }

        // Verify and decode access token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user associated with the decoded token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid access token or user not found.",
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "fail",
                message: "Access token has expired. Please log in again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: "fail",
                message: "Invalid access token. Please log in again.",
            });
        }

        // Fallback for unexpected errors
        next(new ApiError(500, "An error occurred during authentication."));
    }
});
