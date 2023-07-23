const User = require("../../models/User");
const Order = require("../../models/Order");
const Appointment = require("../../models/Appointment");
const Razorpay = require("razorpay");
var invNum = require("invoice-number");
const Receipt = require("../../models/Receipt");

class PaymentController {
  static order_with_rozorpay = async (req, res) => {
    try {
      const data = req.body;
      if (!data.amount) {
        return res.status(400).send({
          status: 400,
          key: "amount",
          message: "amount is required",
        });
      }
      if (!data.subscription_plan_id) {
        return res.status(400).send({
          status: 400,
          key: "subscription_plan_id",
          message: "subscription_plan_id is required",
        });
      }
      if (!data.duration) {
        return res.status(400).send({
          status: 400,
          key: "duration",
          message: "duration is required",
        });
      }

      const user = await User.findOne({
        _id: data.user_id,
      });

      const order_data = await instance.orders.create({
        amount: data.amount,
        currency: "INR",
      });

      const order = Order({
        user_id: req.userId ? req.userId : "",
        order_id: order_data.id,
        amount: order_data.amount,
        subscription_plan_id: data.subscription_plan_id,
        trainer_id: data.trainer_id,
        duration: data.duration,
        currency: order_data.currency,
        receipt_id: "12345",
        status: order_data.status,
        attempts: order_data.attempts,
      });
      var savedorder = await order.save();

      return res.send({ order_id: order_data.id });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };
  static order_with_rozorpayApi = async (req, res) => {
    try {
      const data = req.body;
      if (!data.amount) {
        return res.status(400).send({
          status: 400,
          key: "amount",
          message: "amount is required",
        });
      }
      if (!data.subscription_plan_id) {
        return res.status(400).send({
          status: 400,
          key: "subscription_plan_id",
          message: "subscription_plan_id is required",
        });
      }
      if (!data.duration) {
        return res.status(400).send({
          status: 400,
          key: "duration",
          message: "duration is required",
        });
      }

      const user = await User.findOne({
        _id: data.user_id,
      });

      const order_data = await instance.orders.create({
        amount: data.amount,
        currency: "INR",
      });

      const order = Order({
        user_id: req.login_user ? req.login_user._id : "",
        order_id: order_data.id,
        amount: order_data.amount,
        subscription_plan_id: data.subscription_plan_id,
        trainer_id: data.trainer_id,
        duration: data.duration,
        currency: order_data.currency,
        receipt_id: "12345",
        status: order_data.status,
        attempts: order_data.attempts,
      });
      var savedorder = await order.save();

      return res.send({ order_id: order_data.id });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Something went wrong please try again later");
    }
  };

  static checkout_with_rozorpay = async (req, res) => {
    try {
      const data = req.body;
      if (!data.order_id) {
        return res.status(400).send({
          status: 400,
          key: "order_id",
          message: "order_id is required",
        });
      }
      if (!data.payment_data) {
        return res.status(400).send({
          status: 400,
          key: "payment_data",
          message: "payment_data is required",
        });
      }

      const payment = await instance.orders.fetch(data.order_id);

      if (payment.amount_due == 0) {
        return res.status(400).send({
          status: 400,
          message: "No Payment due",
        });
      } else {
        const order = await Order.findOneAndUpdate(
          {
            order_id: data.order_id,
          },
          {
            payment_data: data.payment_data,
          }
        );

        await Appointment.findOneAndUpdate(
          {
            order,
          },
          {
            status: 1,
          }
        );
      }

      return res.status(200).send({
        status: 200,
        message: "Success",
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Something went wrong please try again later",
      });
    }
  };
}

var instance = new Razorpay({
  key_id: "rzp_test_rFXwtHIILu1CTU",
  key_secret: "OagCUpxf4bDzhU7igpiUOxK2",
});

module.exports = PaymentController;