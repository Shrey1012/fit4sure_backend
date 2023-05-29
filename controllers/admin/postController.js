const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Adminauth = require("../../models/Adminauth");
const path = require("path");
const fs = require("fs");
const root = process.cwd();

class postController {
  static list = async (req, res) => {
    const post = await Post.find().populate("user_id");
    const admin = await Adminauth.find({});
    return res.render("admin/post-list", { post, admin });
  };

  static post_comments = async (req, res) => {
    try {
      const post_comments = await Comment.find().populate("user_id post_id");
      const admin = await Adminauth.find();
      return res.render("admin/post_comments", {
        post_comments,
        admin,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static delete = async (req, res) => {
    try {
      const post = await Post.findOne({
        _id: req.body.id,
      });

      await Post.deleteOne({
        _id: post.id,
      });
      fs.unlinkSync(root + "/public/uploads/post/" + post.image);

      return res.send({
        error: false,
        message: "Post Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await Post.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: Post.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "Post status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = postController;
