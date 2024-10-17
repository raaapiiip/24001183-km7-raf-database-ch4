const express = require("express");
const upload = require("../middlewares/uploader");
const router = express.Router();

const dashboardController = require("../controller/dashboardController");

// API for dashboard
router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
router.post("/users/create", upload.single("photo"), dashboardController.createUser);

// View engine = there's no put/patch and delete request

module.exports = router;