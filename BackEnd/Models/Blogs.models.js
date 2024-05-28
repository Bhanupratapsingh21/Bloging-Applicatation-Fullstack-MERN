import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: true,
    },
    createdBy: {
        _id : { 
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        username : {
            type : String
        },
        profileimg: {
            type : String
        }
    },
}, { timestamps: true }
)

const Blog = model("blog",blogSchema);

export default Blog;