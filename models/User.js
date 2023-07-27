const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  // name: {
  //   type: String,
  // },
  // mobile_number: {
  //   type: String,
  // },
  // age: {
  //   type: String,
  // },
  // gender: {
  //   type: String,
  // },
  // height: {
  //   type: String,
  // },
  // current_weight: {
  //   type: String,
  // },
  // target_weight: {
  //   type: String,
  // },
  // lifestyle: {
  //   type: String,
  // },
  // medical_condition: {
  //   type: String,
  // },
  // weight_goal: {
  //   type: String,
  // },
  // city: {
  //   type: String,
  // },
  // language: {
  //   type: String,
  // },
  // what_brings: {
  //   type: String,
  // },
  // bio: {
  //   type: String,
  // },
  // image: {
  //   type: String,
  // },
  // diet_preference: {
  //   type: String,
  // },
  // allergies: {
  //   type: String,
  // },
  // preferred_cuisine: {
  //   type: String,
  // },
  // approved: {
  //   type: Boolean,
  //   default: false,
  // },
  // created_at: {
  //   type: String,
  //   default: Date.now,
  // },
  // updated_at: {
  //   type: String,
  //   default: Date.now,
  // },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  image: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  stateOfResidence: {
    type: String,
  },
  test: {
    type: String,
  },
});

module.exports = mongoose.model("User", schema);
