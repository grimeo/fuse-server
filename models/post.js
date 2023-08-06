const mongoose = require("mongoose");

const post = {
  ServiceTitle: "",
  Description: "",
  Schedule: "",
  Location: "",
  Offer: "",
  CreatedAt: "",
  PostOwner: "",
};

const postSchema = new mongoose.Schema({
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
  CreatedAt: {
    type: String,
  },
  PostOwner: {
    type: String,
  },
});
