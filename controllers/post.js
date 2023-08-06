const Post = require("../models/post");

exports.createPost = async (req, res) => {
  //   const { ServiceTitle, Description, Schedule, Location, Offer } = req.body;

  console.log(req.body);

  res.json(req.body);
};
