const express = require("express");
const upload = require("../middlewares/uploader");
const router = express.Router();

const carController = require("../controller/carController");

// API for get all cars data
router.get("/", carController.getAllCars);

// API for get car data by id
router.get("/:id", carController.getCarById);

// API for delete car data by id
router.delete("/:id", carController.deleteCarById);

// API for update car data by id
router.patch("/:id", carController.updateCar);

// API for create new car data
router.post("/", upload.array("images"), carController.createCar);

module.exports = router;