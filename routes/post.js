const express = require("express");
const { createPost, getPost } = require("../controllers/post");

const router = express.Router();

router.post("/create-post", createPost);
router.post("/get-posts", getPost);

module.exports = router;
