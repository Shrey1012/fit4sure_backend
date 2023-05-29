const ShortVideo = require("../../models/ShortVideo");
const Shortvideo_Comments = require("../../models/Shortvideo_Comments");
const Shortvideo_Likes = require("../../models/Shortvideo_Likes");
const Saved = require("../../models/Saved");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const root = process.cwd();
const jwt = require("jsonwebtoken");
const videoFilter = require("../../config/videoFilter");

class ShortVideoController {
  static add_shortVideo = async (req, res) => {
    try {           
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an file");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        var video = req.file.filename;
        var description = req.body.description;
        const user = req.login_user;
        if (!user) return res.status(401).send("User not found");

        let shortVideo = {
          video: video,
          description: description,
          user_id: user._id,
        };

        let saveObj = shortVideo;
        await ShortVideo.create(saveObj);

        let returnObj = {
          message: "Success",
          data: {
            video: video,
            description: description,
            user_id: user._id,
          },
        };
        // sending notification start
        const notification = Notification({
          user: req.id,
          type: "Shortvideo-added",
          data: {
            time: Date.now(),
          },
        });
        await notification.save();
        if (req.app.socket) req.app.socket.emit("Shortvideo-added");

        // sending notification end
        res.send(returnObj);
      });
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .send("Something went wrong please try again later");
    }
  };
  static shortvideo_like = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      var token = req.body.token;
      var shortvideo_id = req.body.shortvideo_id;
      var is_liked =
        req.body.is_liked && req.body.is_liked == "true"
          ? Boolean(req.body.is_liked)
          : false;
      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("User not found");

      let findData = {
        shortvideo_id: shortvideo_id,
        user_id: user._id,
      };

      let findRec = await Shortvideo_Likes.findOne(findData);
      if (findRec) {
        findRec.is_liked = is_liked;
        findRec.save();
      } else {
        let saveObj = findData;
        saveObj.is_liked = is_liked;
        await Shortvideo_Likes.create(saveObj);
      }
      let returnObj = {
        message: "Success",
        data: {
          shortvideo_id: shortvideo_id,
          user_id: user._id,
          is_liked: is_liked,
        },
      };
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Shortvideo-Liked",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Shortvideo-Liked");

      // sending notification end
      res.send(returnObj);
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
  static shortvideo_comment = async (req, res) => {
    let msg = "Something went wrong please try again later";
    try {
      var token = req.body.token;
      var shortvideo_id = req.body.shortvideo_id;
      var comment = req.body.comment;
      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("User not found");

      let findData = {
        shortvideo_id: shortvideo_id,
        comment: comment,
        user_id: user._id,
      };

      let saveObj = findData;
      await Shortvideo_Comments.create(saveObj);

      let returnObj = {
        message: "Success",
        data: {
          shortvideo_id: shortvideo_id,
          user_id: user._id,
          comment: comment,
        },
      };
      // sending notification start
      const notification = Notification({
        user: req.id,
        type: "Shortvideo-Comment",
        data: {
          time: Date.now(),
        },
      });
      await notification.save();
      if (req.app.socket) req.app.socket.emit("Shortvideo-Comment");

      // sending notification end
      res.send(returnObj);
    } catch (error) {
      console.log(error);
      return res.status(401).send(msg);
    }
  };
  static video_saved = async (req, res) => {
    try {
      let token = req.body.token;
      const payload = jwt.decode(token, process.env.TOKEN_SECRET);
      const user = await User.findById(payload._id);
      if (!user) return res.status(401).send("user not found");
      const video_save = Saved({
        shortVideo_id: req.body.shortVideo_id,
        user_id: user._id,
      });
      const data = await video_save.save();
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = ShortVideoController;

//Image Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(root + "/public/uploads/shortvideo"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//@Upload images
const upload = multer({
  storage: storage,
  //   fileFilter: imageFilter,
}).single("video");
