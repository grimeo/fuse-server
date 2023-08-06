const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const {
    ServiceTitle,
    Description,
    Schedule,
    Location,
    Offer,
    IsPostByServiceProvider,
    Avatar,
    PostOwner,
    PostOwnerEmail,
  } = req.body;

  const post = await Post({
    ServiceTitle,
    Description,
    Schedule,
    Location,
    Offer,
    IsPostByServiceProvider,
    Avatar,
    PostOwner,
    PostOwnerEmail,
  });

  await post.save();

  res.json({ success: true, post: post });
};

exports.getPost = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(10);

  res.json({ success: true, posts: posts });
};
