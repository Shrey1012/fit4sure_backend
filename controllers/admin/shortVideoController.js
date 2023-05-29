const ShortVideo = require("../../models/ShortVideo");
const Shortvideo_comment = require("../../models/Shortvideo_Comments");
// const Shortvideo_Likes = require("../../models/Shortvideo_Likes");
const Adminauth = require("../../models/Adminauth");

class ShortvideoController {
  static shortvideo_list = async (req, res) => {
    try {
      const shortVideo = await ShortVideo.find({}).populate("user_id");
      const admin = await Adminauth.find();
      return res.render("admin/shortVideo", { shortVideo, admin });
    } catch (error) {
      console.log(error);
    }
  };

  static ShortvideoComments_list = async (req, res) => {
    try {
      const shortvideocomments = await Shortvideo_comment.find().populate(
        "user_id  shortvideo_id"
      );
      const admin = await Adminauth.find();
      return res.render("admin/shortvideoComments", {
        shortvideocomments,
        admin,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // static ShortvideoLikes_list = async (req, res) => {
  //   try {
  //     const shortvideo_Likes = await Shortvideo_Likes.find().populate(
  //       "user_id  shortvideo_id"
  //     );
  //     return res.render("admin/shortvideoLikes", { shortvideo_Likes });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  static delete = async (req, res) => {
    try {
      const shortvideo = await ShortVideo.findOne({
        _id: req.body.id,
      });

      await ShortVideo.deleteOne({
        _id: shortvideo.id,
      });
      fs.unlinkSync(root + "/public/uploads/shortvideo/" + shortvideo.image);

      return res.send({
        error: false,
        message: "ShortVideo Deleted Successfully",
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

      await ShortVideo.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: ShortVideo.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "ShortVideo status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = ShortvideoController;
