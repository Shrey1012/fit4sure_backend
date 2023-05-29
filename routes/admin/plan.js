const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const PlanController = require("../../controllers/admin/planController");

router.get("/list/:id", NotLoggedIn, PlanController.list);
router.post("/add", NotLoggedIn, PlanController.add);
router.post("/delete", NotLoggedIn, PlanController.delete);

module.exports = router;
