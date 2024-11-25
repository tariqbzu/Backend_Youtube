import { asyncHandler } from  "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    const {username, email, fullname, password} = req.body
    
    // validation - not empty
    // if(fullname === ""){
    //     throw new ApiError(400, "FullName is Required")
    // }
    if ([username, fullname, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are compulsory");
    } else if (!email.includes("@")) { // Corrected 'include' to 'includes'
        throw new ApiError(400, "Email should contain '@' sign");
    }

    // check if user already exists : username , email
    const existedUser = User.findOne({username});
    if(existedUser){
        throw new ApiError(409, "User Already Exists");
    }
    const existedEmail = User.find({email});
    if(existedEmail){
        throw new ApiError(408, "Email Already Exists");
    }
    
    // check images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar File is Required");
    } 

    // upload them to cloudinary , avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400, "Avatar File is Required");
    }

    // create user object - create entry in db
    const user = User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase()
    })

    // remove password and refresh token field from response because when data is send to db all comes is response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // check for user creation 
    if(!createdUser){
        throw new ApiError(400, "Something went Wrong While Registrig the User");
    }
    // return response  
    return res.status(201).json(
        new ApiResponse(200, createdUser, "USer Register Successfully!")
    )

})

export {
    registerUser,
}