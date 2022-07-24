import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema(
    {
        image: String,
        title: String,
        comments: Array,
        userId: mongoose.ObjectId,
        userName: String,
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
