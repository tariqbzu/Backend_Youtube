import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
            // Direct encryption is not possible we get help from moongse hooks



const userSchema = new Schema(
    {
        username: {
            type:String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index :true
        },
        email: {
            type:String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullname: {
            type:String,
            required : true,
            trim : true,
            index : true
        },
        avatar: {
            type : String ,      // Cloudinary URL
            required : true
        },
        coverImage: {
            type : String,      // Cloudinary URL
        },
        watchHistory: [             // use package moongose-aggregate-paginate-v2
            {
                type : Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type : String,
            required : [true, 'Password is Required'],
        },
        refreshToken: {
            type : String,
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}
//  Generate Tokens

userSchema.methods.generateAccessToken = function (){
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn : process.env.ACCESS_TOKEN_EXPIREY,
        }
    )
}
userSchema.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn : process.env.REFRESH_TOKEN_EXPIREY,
        }
    )
}

export const User = mongoose.model("User", userSchema)