const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: String,
    required: false,
    default: null,
  },
  datetime: {
    type: Date,
    required: false,
    default: Date.now,
  },
  meeting_id: {
    type: String,
    required: false,
    default: null,
  },
  meeting_password: {
    type: String,
    required: false,
    default: null,
  },
  date: {
    type: String,
    required: false,
    default: null,
  },
  time: {
    type: String,
    default: null,
  },
  created_at: {
    type: String,
    default: Date,
  },
});

module.exports = mongoose.model("classes", ClassSchema);
