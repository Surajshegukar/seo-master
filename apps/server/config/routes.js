const express = require("express");

const commonRoutes = require("../routes/common_routes");
const departmentRoutes = require("../routes/department_routes");
const categoryRoutes = require("../routes/category_routes");
const magazineRoutes = require("../routes/magazine_routes");
const podcastRoutes = require("../routes/podcast_routes");
const authRoutes = require("../routes/auth_routes");
const router = express.Router();

router.use("/", commonRoutes);
router.use("/", authRoutes);
router.use("/department", departmentRoutes);
router.use("/category", categoryRoutes);
router.use("/magazine", magazineRoutes);
router.use("/podcast", podcastRoutes);


module.exports = router;