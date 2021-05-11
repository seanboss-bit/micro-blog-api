const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Add Title']
    },
    body: {
        type: String,
        required:[ true, 'Please add body']
    },
    category: {
        type: String, 
        required: [true, "Please add Category"]
    },
    tag: {
        type: String,
    },
    dateCreated: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;