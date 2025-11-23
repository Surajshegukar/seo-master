const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload")("uploads/authers");

const {
  addAuther,
  getAllAuthers,
  getAutherById,
  updateAuther,
  getAjaxAuthers,
  uniqueAuther,
} = require("../controllers/admin/auther_controller");
const {
  autherValidationRules,
  validateRequest,
} = require("../validations/validations");
const authenticateAdmin = require("../middleware/authenticate_admin");

router.get("/auther-list", getAllAuthers);
router.post(
  "/add-auther",
  authenticateAdmin,
  upload.single("image"),
  autherValidationRules,
  validateRequest,
  addAuther
);
router.put(
  "/add-auther/:id",
  upload.single("image"),
  authenticateAdmin,
  autherValidationRules,
  validateRequest,
  updateAuther
);
router.get("/get-auther/:id", getAutherById);

router.post("/ajax/auther-list", getAjaxAuthers);

router.get("/check-unique",uniqueAuther);

module.exports = router;
