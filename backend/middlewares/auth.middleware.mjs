import jwt from "jsonwebtoken"
import { User } from "../models/user.model.mjs"
import asyncHandler from "express-async-handler"

export const verifyToken = asyncHandler( async (request, response, next) => {
    let token = "";
    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")){
        token = request.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        // console.log(decoded);
        request.user = await User.findById(decoded._id).select("-password")
        next()
    }
    if(!token){
        response.status(401)
        throw new Error(`Token not found`)
    }
})