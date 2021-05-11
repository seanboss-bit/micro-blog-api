const express = require("express");
const authGuard = require("../middleware/authGuard");
const Post = require("../model/Post");

const router = new express.Router();

// Create Post
router.post("/post/add", authGuard, async (req, res) => {
  try {
    const incomingData = req.body;

    incomingData.dateCreated = new Date();

    incomingData.postedBy = req.user._id; 

    const newPost = new Post(incomingData)
    await newPost.save()

    res.status(201).json({
        message: 'Posted Successfully',
        data: newPost
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all My Post
router.get('/post/all' , authGuard, async (req, res) => {
    try {
        const posts = await Post.find({postedBy: req.user._id})
        const postCount = await Post.countDocuments({postedBy: req.user._id})

        res.status(201).json({
            message: 'Posted Successfully',
            data: posts,
            postCount,
        })

    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
})





module.exports = router;
