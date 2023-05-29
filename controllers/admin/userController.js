const User = require("../../models/User");
const Adminauth = require("../../models/Adminauth");
const bcrypt = require("bcrypt");
require("dotenv");

class usersController {
  static list = async (req, res) => {
    try {
      let recordData = await User.find().sort({
        created_at: -1,
      });
      const admin = await Adminauth.find({});
      return res.render("admin/user-list", {
        recordData,
        admin,
      });
    } catch (error) {
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await User.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: User.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "User status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = usersController;
