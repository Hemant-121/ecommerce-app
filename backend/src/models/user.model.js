import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the schema for the user collection
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true 
    }
);

// Middleware function to hash the password before saving
userSchema.pre("save", async function (next) {
    // Hash the password only if it has been modified
    if (!this.isModified("password")) return next();

    // Hash the password using bcrypt
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function(password) {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function() {
    // Generate a JWT token containing user information
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for accessToken encryption
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Expiry time for the accessToken
        }
    );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function() {
    // Generate a JWT token containing user ID only
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for refreshToken encryption
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Expiry time for the refreshToken
        }
    );
};

export const User = mongoose.model("User", userSchema);
