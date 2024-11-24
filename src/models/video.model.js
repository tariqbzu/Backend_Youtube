import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoTitle: {
            type: String,
            required : true
        },
        owner: {
            type : mongoose.Types.ObjectId,
            ref: "Users"
        },
        thumbnail: {
            type : String,
            required: true
        },
        videoFile: {
            type: String, // Cloudinary URL
            required: true
        },
        description: {
            type : String,
            required: true,
            trim : true
        },
        duration: {
            type: Number
        },
        views: {
            type : Number,
            default : 0
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps : true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)