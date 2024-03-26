import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// Function to check if an email is in a valid format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to check if a password meets the required format
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(password);
}
// Function to generate access and refresh tokens for a user
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

// Controller function to register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // Validate input fields
  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email address");
  }
  if (!isValidPassword(password)) {
    throw new ApiError(400, "Invalid password format");
  }

  // Check if user with the same email or username already exists
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Create new user
  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  // Remove sensitive data from user object
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  // Return response
  return res.status(201).json(new ApiResponse(200, createdUser, "User registered Successfully"));
});



// Controller function to log in a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Validate input
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  // Find user by email or username
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Check if the password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  // Get user data without sensitive information
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  // Set options for cookies
  const options = { httpOnly: true, secure: true };

  // Return response with cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged In Successfully"));
});

// Controller function to log out a user
const logoutUser = asyncHandler(async (req, res) => {
  // Remove refreshToken from user document
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

  // Set options for cookies
  const options = { httpOnly: true, secure: true };

  // Clear cookies
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

// Controller function to refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Get refreshToken from cookies or request body
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  // Validate refreshToken
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    // Verify refreshToken and find user
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user || incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Generate new access and refresh tokens
    const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id);

    // Set options for cookies
    const options = { httpOnly: true, secure: true };

    // Return response with cookies
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// Controller function to change user's password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Find user and check if old password is correct
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  // Validate new password
  if (!isValidPassword(newPassword)) {
    throw new ApiError(400, "New password format is not valid!!");
  }

  // Change password and save user
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  // Return success response
  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Controller function to get current user details
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"));
});


// Controller function to update account details
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;
  
    // Validate input
    if (!fullName || !email) {
      throw new ApiError(400, "All fields are required");
    }
  
    // Update user details
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: { fullName, email } },
      { new: true }
    ).select("-password");
  
    // Return updated user details
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"));
  });
  
  // Export controller functions
  export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
  };
  