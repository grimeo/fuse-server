const mongoose = require("mongoose");

const post = {
  ServiceTitle: "",
  Description: "",
  Schedule: "",
  Location: "",
  Offer: "",
  PostOwner: "",
  IsPostByServiceProvider: null,
};

const postSchema = new mongoose.Schema(
  {
    ServiceTitle: {
      type: String,
    },
    Description: {
      type: String,
    },
    Schedule: {
      type: String,
    },
    Location: {
      type: String,
    },
    Offer: {
      type: String,
    },
    IsPostByServiceProvider: {
      type: Boolean,
    },
    Avatar: {
      type: String,
    },
    PostOwner: {
      type: String,
    },
    PostOwnerEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
