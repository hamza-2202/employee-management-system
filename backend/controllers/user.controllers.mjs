import asyncHandler from "express-async-handler"
import { User } from "../models/user.model.mjs"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.mjs"

const register = asyncHandler(async (request, response) => {
    const { username, email, password } = request.body
    if (!username || !email || !password) {
        response.status(400)
        throw new Error("Input all fields")
    }

    const checkUser = await User.findOne({ email })
    if (checkUser) {
        response.status(400)
        throw new Error("User already registered")
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        email,
        password: hashPassword
    })
    await user.save()

    response.status(201).json({
        message: `User registered successfully.`,
        username,
        email
    })
})

const login = asyncHandler(async (request, response) => {
    const { email, password } = request.body
    if (!email || !password) {
        response.status(400)
        throw new Error("Input all fields")
    }

    const user = await User.findOne({ email })
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        response.status(401);
        throw new Error("Invalid Credentials");
    }

    let token = generateToken(user._id)

    response.status(200).json({
        message: "User logged in successfully",
        user: {name: user.username, email: user.email},
        token,
        success: true
    })
})

const profile = asyncHandler(async () => {

    response.status(200).json({
        message: "Profile route"
    })
})

export {
    register,
    login,
    profile
}