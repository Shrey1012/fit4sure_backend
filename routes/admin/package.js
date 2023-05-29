const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const PackageController = require("../../controllers/admin/packageController");

router.get("/list", NotLoggedIn, PackageController.list);
router.post("/add", NotLoggedIn, PackageController.add);
router.post("/delete", NotLoggedIn, PackageController.delete);

router.get("/includes/list/:id", NotLoggedIn, PackageController.faq_list);
router.post("/includes/add", NotLoggedIn, PackageController.faq_add);
router.post("/includes/delete", NotLoggedIn, PackageController.faq_delete);

module.exports = router;
