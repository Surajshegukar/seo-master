const express = require("express");

const commonRoutes = require("../routes/common_routes");
const departmentRoutes = require("../routes/department_routes");
const categoryRoutes = require("../routes/category_routes");
const magazineRoutes = require("../routes/magazine_routes");
const podcastRoutes = require("../routes/podcast_routes");
const autherRoutes = require("../routes/auther_routes");

const router = express.Router();

router.use("/api2", commonRoutes);
router.use("/api2/department", departmentRoutes);
router.use("/api2/category", categoryRoutes);
router.use("/api2/magazine", magazineRoutes);
router.use("/api2/podcast", podcastRoutes);
router.use("/api2/auther", autherRoutes);

module.exports = router;