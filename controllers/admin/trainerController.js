const mongoose = require("mongoose");
const Trainer = require("../../models/Trainer");
const Adminauth = require("../../models/Adminauth");
const multer = require("multer");
const path = require("path");
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
const root = process.cwd();
const moment = require("moment");

class TrainerController {
  static addGet = async (req, res) => {
    try {
      const trainer = await Trainer.find();
      const admin = await Adminauth.find({});

      res.render("admin/add-trainer", { trainer, admin });
    } catch (err) {
      console.log(err);
      return res.send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (req.fileValidationError) {
          return res.send(req.fileValidationError);
        } else if (!req.file) {
          return res.send("Please upload an icon");
        } else if (err instanceof multer.MulterError) {
          console.log(err);
          return res.send(err);
        } else if (err) {
          console.log(err);
          return res.send(err);
        }

        const trainer = new Trainer({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          experience_year: req.body.experience_year,
          about: req.body.about,
          location: req.body.location,
          experties: req.body.experties,
          image: req.file.filename,
          bank_name: req.body.bank_name,
          account_holder_name: req.body.account_holder_name,
          account_no: req.body.account_no,
          ifsc_code: req.body.ifsc_code,
          branch: req.body.branch,
          upi: req.body.upi,
        });

        await trainer.save();
        return res.send({
          error: false,
          message: " Trainer added successfully",
        });
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static trainerList = async (req, res) => {
    try {
      const trainer = await Trainer.find();
      const admin = await Adminauth.find({});
      return res.render("admin/trainer-list", {
        trainer,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.send("Something went wrong please try again later");
    }
  };

  static Approved = async (req, res) => {
    try {
      const data = req.body;

      await Trainer.findByIdAndUpdate(data.id, {
        approved: data.approved,
      });
      ({
        type: "form_status",
        data: {
          id: Trainer.id,
          status: data.approved ? "approved" : "disapproved",
          time: Date.now(),
        },
      });
      return res.send({
        error: false,
        message: "Trainer status updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static edit = async (req, res) => {
    try {
      const trainer = await Trainer.findOne({
        _id: req.body.editid,
      });
      await Trainer.findOneAndUpdate(
        {
          _id: req.body.editid,
        },
        {
          name: req.body.edit_name,
          email: req.body.edit_email,
          phone: req.body.edit_phone,
          experience_year: req.body.edit_experience_year,
          about: req.body.edit_about,
          location: req.body.edit_location,
          experties: req.body.edit_experties,
          bank_name: req.body.edit_bank_name,
          account_holder_name: req.body.edit_account_holder_name,
          account_no: req.body.edit_account_no,
          ifsc_code: req.body.edit_ifsc_code,
          branch: req.body.edit_branch,
          upi: req.body.edit_upi,
          updated_at: Date.now(),
        }
      );
      return res.send({
        error: false,
        message: "Trainer updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const trainer = await Trainer.findOne({
        _id: req.body.id,
      });
      //  return console.log(Astrologer)
      await Trainer.deleteOne({
        _id: trainer.id,
      });
      fs.unlink(
        path.join(root, "/public/uploads/trainer", trainer.image),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      return res.send({
        error: false,
        message: "Trainer Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static trainerDetails = async (req, res) => {
    const trainerId = req.params.trainerId;
    const aggregation = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(trainerId),
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "trainer_id",
          as: "orders",
        },
      },
      {
        $lookup: {
          from: "classes",
          let: {
            trainerId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$trainer_id", "$$trainerId"],
                    },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          as: "classes",
        },
      },
    ];
    try {
      const trainerDetails = await Trainer.aggregate(aggregation);
      const admin = await Adminauth.find({});
      if (trainerDetails != null && trainerDetails.length > 0) {
        return res.render("admin/trainer-details", {
          trainerDetails: trainerDetails[0],
          admin,
        });
      } else {
        return res
          .status(404)
          .send("No Trainer found with given id please check id.");
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send("Error genrated while fetching trainer details.");
    }
  };
}

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads/trainer"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 1000000
  // },
  fileFilter: imageFilter,
}).single("image");

module.exports = TrainerController;
