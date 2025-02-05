import User from '../model/user.model.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,role}=req.body
    const existingUser=await User.findOne({email})

    console.log(req.body)
    if(existingUser){
        throw new ApiError(400,'User already exists')
    }

    const user=await User.create({
        name,
        email,
        password,
        role
    })
    return res
    .status(201)
    .json(new ApiResponse(201,{
        message:'User registered successfully',
        user
    }))
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({
        $and:[
            {email}
        ]
    }).select('-createdAt -updatedAt -__v -refreshToken')

    if(!user){
        throw new ApiError(404,'User not found')
    }

    const isPasswordCorrect=await user.isPasswordCorrect(password)

    if(!isPasswordCorrect){
        throw new ApiError(400,'Invalid credentials')
    }

    const accessToken=await user.generateAccessToken()
    const refreshToken=await user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save()
    const options={
        httpOnly:true,
        secure:true,
        sameSite:'None'
    }

    return res
    .status(200)
    .cookie('accessToken',accessToken,options)
    .cookie('refreshToken',refreshToken,options)
    .json(new ApiResponse(200,{user}))
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    }
)
    const options={
        httpOnly:true,
        secure:true,
        sameSite:'None'
    }

    return res
    .status(200)
    .clearCookie('accessToken',options)
    .clearCookie('refreshToken',options)
    .json(new ApiResponse(200,{
        message:'Logged out successfully'
    }))
})

const getUserProfile=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(new ApiResponse(200,{
        user:req.user
    }))
})

const updateProfile=asyncHandler(async(req,res)=>{
    const {age,contact,address,gender,city, existingDiseases, allergies, isDiabetic, isPregnant, isBP}=req.body
    const user=await User.findByIdAndUpdate(req.user._id,
        {
        $set:{
            profile:{
                age,
                contact,
                address,
                gender,
                city,
                existingDiseases,
                allergies,
                isDiabetic,
                isPregnant,
                isBP
            },
        }
    },
    {
        new:true,
        runValidators:true
    }
).select('-createdAt -updatedAt -__v -refreshToken -password')
    
        return res
        .status(200)
        .json(new ApiResponse(200,{
            user
        }))
})

const updatePfp = asyncHandler(async (req, res) => {
    const avatarPath = req.file?.path;
  
    if (!avatarPath) {
      throw new ApiError(400, "No file uploaded or file path missing");
    }
  
    const avatar = await uploadOnCloudinary(avatarPath);
  
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: avatar.secure_url } },
      { new: true }
    ).select("-createdAt -updatedAt -__v -password -role -profile");
  
    if (!user) {
      throw new ApiError(400, "Profile picture not updated");
    }
  
    return res.status(200).json(
      new ApiResponse(200, {
        message: "Profile picture updated successfully",
        user,
      })
    );
  });
  
export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateProfile,
    updatePfp
}