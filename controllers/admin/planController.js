const Plan = require("../../models/Plan");
const Adminauth = require("../../models/Adminauth");

class PlanController {
  static list = async (req, res) => {
    try {
      const package_id = req.params.id;
      const plan = await Plan.find({
        package_id: package_id,
      });
      const admin = await Adminauth.find({});
      return res.render("admin/plan", {
        plan,
        package_id,
        admin,
      });
    } catch (error) {
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static add = async (req, res) => {
    try {
      // return console.log(req.body);
      const plan = Plan({
        package_id: req.body.package_id,
        title: req.body.title,
        offer_price: req.body.offer_price,
        actual_price: req.body.actual_price,
        duration: req.body.duration,
      });

      await plan.save();
      return res.send({
        error: false,
        message: "Plan added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Somthing went wrong please try again later");
    }
  };

  static delete = async (req, res) => {
    try {
      const plan = await Plan.findOne({
        _id: req.body.id,
      });

      await Plan.deleteOne({
        _id: plan.id,
      });
      return res.send({
        error: false,
        message: "Plan deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
}

module.exports = PlanController;
