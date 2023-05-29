const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const usersController = require("../../controllers/admin/userController");

router.get("/list", NotLoggedIn, usersController.list);
router.post("/approved", NotLoggedIn, usersController.Approved);

module.exports = router;
