const main = require("./routes/admin/main");
const auth = require("./routes/admin/auth");
const dashboard = require("./routes/admin/dashboard");
const user = require("./routes/admin/user");
const aboutus = require("./routes/admin/aboutus");
const faq = require("./routes/admin/faq");
const privacypolicy = require("./routes/admin/privacypolicy");
const termscondition = require("./routes/admin/termscondition");
const contact = require("./routes/admin/contact");
const sliderRoute = require("./routes/admin/sliderRoute");
const banner = require("./routes/admin/banner");
const blog = require("./routes/admin/blog");
const post = require("./routes/admin/post");
// const shortVideo = require("./routes/admin/shortVideo");
const package = require("./routes/admin/package");
const plan = require("./routes/admin/plan");
const payment = require("./routes/admin/payment");
const classes = require("./routes/admin/classes");
const coupon = require("./routes/admin/coupon");
const fit_provides = require("./routes/admin/fit_provides");
const transformations = require("./routes/admin/transformations");
const testimonials = require("./routes/admin/testimonials");
const team = require("./routes/admin/team");

const setting_Footer  = require("./routes/admin/setting_footer");
const web_contact = require("./routes/admin/web_contact");
const user_say = require("./routes/admin/user_say");
const web_faq = require("./routes/admin/web_faq");
const web_services = require("./routes/admin/web_serbices");
const web_apart = require("./routes/admin/web_apart");
const web_slider = require("./routes/admin/web_slider");
const food_type = require("./routes/admin/food_type");
const web_testimonials = require("./routes/admin/web_testimonials");
const talk_to_expert = require("./routes/admin/talk_to_expert");
const view_full_answer = require("./routes/admin/view_full_answer");
const counting = require("./routes/admin/counting");
const setting = require("./routes/admin/setting");
const trainer = require("./routes/admin/trainer");
const web_features = require("./routes/admin/web_features");
const web_qna = require("./routes/admin/web_qna");
const web_stories = require("./routes/admin/web_stories");
const web_careers = require("./routes/admin/web_careers");

const AdminRoutes = (app) => {
  app.use("/", main);
  app.use("/admin", auth);
  app.use("/admin", dashboard);
  app.use("/admin/users", user);
  app.use("/admin", aboutus);
  app.use("/admin", faq);
  app.use("/admin", privacypolicy);
  app.use("/admin", termscondition);
  app.use("/admin/contact", contact);
  app.use("/admin/sliders", sliderRoute);
  app.use("/admin/banners", banner);
  app.use("/admin/blog", blog);
  app.use("/admin/post", post);
  // app.use("/admin/shortvideo", shortVideo);
  app.use("/admin/package", package);
  app.use("/admin/plan", plan);
  app.use("/admin/payment", payment);
  app.use("/admin/classes", classes);
  app.use("/admin/coupon", coupon);
  app.use("/admin/fit_provides", fit_provides);
  app.use("/admin/transformations", transformations);
  app.use("/admin/testimonials", testimonials);
  app.use("/admin/team", team);
  app.use("/admin/setting_footer", setting_Footer);
  app.use("/admin/web_contact", web_contact);
  app.use("/admin/user_say", user_say);
  app.use("/admin/web_faq", web_faq);
  app.use("/admin/web_services", web_services);
  app.use("/admin/web_apart", web_apart);
  app.use("/admin/web_slider", web_slider);
  app.use("/admin/food_type", food_type);
  app.use("/admin/web_testimonials", web_testimonials);
  app.use("/admin/talk_to_expert", talk_to_expert);
  app.use("/admin/view_full_answer", view_full_answer);
  app.use("/admin/counting", counting);
  app.use("/admin/setting", setting);
  app.use("/admin/trainer", trainer);
  app.use("/admin/web_features", web_features);
  app.use("/admin/web_qna", web_qna);
  app.use("/admin/web_stories", web_stories);
  app.use("/admin/web_careers", web_careers);
};

module.exports = AdminRoutes;