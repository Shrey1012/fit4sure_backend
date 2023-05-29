const ShortvideoController = require("../../controllers/admin/shortVideoController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const router = require("express").Router();

router.get("/list", NotLoggedIn, ShortvideoController.shortvideo_list);

router.get(
  "/comments",
  NotLoggedIn,
  ShortvideoController.ShortvideoComments_list
);
router.post("/approved", NotLoggedIn, ShortvideoController.Approved);

// router.get(
//   "/shortvideo-likes",
//   NotLoggedIn,
//   ShortvideoController.ShortvideoLikes_list
// );

module.exports = router;
