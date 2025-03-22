import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import User from '../model/user.model.js'
import { ApiError } from '../utils/apiError.js'

const verifyJWT=asyncHandler(async(req,_,next)=>{
   try {
     
        const token=req.cookies?.accessToken || req.header('Authorization').replace('Bearer ','')

        if(!token){
            throw new ApiError(401,'Unauthorized')
        }
        
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        const user=await User.findById(decoded._id).select('-password -createdAt -updatedAt -__v')

        req.user=user
        next()
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
   }

    
})

export {verifyJWT}