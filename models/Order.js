const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  order_id: {
    type: String,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    default: null,
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  duration: {
    type: String,
    default: null,
  },
  amount: {
    type: Number,
    require: true,
  },
  currency: {
    type: String,
    require: true,
    default: "INR",
  },
  receipt_id: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "created",
  },
  created_at: {
    type: String,
    default: Date.now,
  },
  updated_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", schema);
