import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { createTokenForUser } from "../Utils/Authentication.js";

// Define the user schema
const userSchema = new Schema({
    fullname: {
        type: String,
        unique : true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/user.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
},
    { timestamps: true });

// Pre-save hook to hash the password
userSchema.pre("save", function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // Generate a salt
    const generateSalt = randomBytes(16).toString();

    // Hash the password using the salt
    const hashedPassword = createHmac("sha256", generateSalt)
        .update(user.password)
        .digest("hex");

    // Store the salt and hashed password
    user.salt = generateSalt;
    user.password = hashedPassword;

    next();
});
userSchema.statics.matchPasswordandgenratetoken = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("User Not Found");

    const generateSalt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", generateSalt)
        .update(password) // Use the provided password here
        .digest("hex");

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token
};

// Create the User model
const User = model("User", userSchema);

export default User;
