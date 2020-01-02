const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Get All The Posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err })
    }
});

// Create New Post
router.post("/", async (req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Detail Post
router.get('/:postId', async (req, res) => {
    try {
        const postDetail = await Post.findById(req.params.postId);
        res.json(postDetail);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.postId });
        res.json(removePost)
    } catch (err) {
        res.json({ message: err });
    }
});

// Update Post In title
router.patch('/:postId', async (req, res) => {
    try {
        const updated = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });
        res.json(updated);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update Post By Put Method
router.put('/:postId', async (req, res) => {
    try {
        const updated = await Post.findOneAndUpdate(
            { _id: req.params.postId },
            {
                $set:
                {
                    title: req.body.title,
                    description: req.body.description
                }
            },
            { useFindAndModify: false }
        );
        res.json(updated);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
