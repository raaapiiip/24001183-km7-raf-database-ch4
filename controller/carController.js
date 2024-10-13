const { Car } = require("../models");
const imagekit = require("../lib/imagekit");
const multer = require ("multer");

async function getAllCars(req, res) {
    try {
        // console.log("Processing when there's request");
        // console.log(req.requestTime)
        // console.log("Processing who's try to request/access");
        // console.log(req.username)
        // console.log("Processing what API that user request");
        // console.log(req.originalUrl)
        const cars = await Car.findAll();

        res.status(200).json({
            status: "200",
            message: "Success to get cars data",
            isSuccess: true,
            data: { cars },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function getCarById(req, res) {
    const id = req.params.id;
    try {
        const car = await Car.findByPk(id);

        if (!car) {
            return res.status(404).json({
                status: "404",
                message: "Car Not Found!",
            });
        }

        res.status(200).json({
            status: "200",
            message: "Success to get car data",
            isSuccess: true,
            data: { car },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function deleteCarById(req, res) {
    const id = req.params.id;
    try {
        const car = await Car.findByPk(id);

        if (car) {
            await car.destroy();

            res.status(200).json({
                status: "200",
                message: "Success to delete car data",
                isSuccess: true,
                data: { car },
            });
        } else {
            res.status(404).json({
                status: "404",
                message: "Car data is not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function updateCar(req, res) {
    const id = req.params.id;
    const { plate, model, type, year } = req.body;

    try {
        const car = await Car.findByPk(id);

        if (car) {
            car.plate = plate;
            car.model = model;
            car.type = type;
            car.year = year;

            await car.save();

            res.status(200).json({
                status: "200",
                message: "Success to update car data",
                isSuccess: true,
                data: { car },
            });
        } else {
            res.status(404).json({
                status: "404",
                message: "Car data is not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function createCar(req, res) {
    // File processing
    const uploadedImages = [];

    for (const file of req.files) {
        // 1. Split to get extension and file name
        const split = file.originalname.split(".");
        const extension = split[split.length - 1];
        const filename = split[0];

        // 2. Upload image to server
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `Profile-${filename}-${Date.now()}.${extension}`
        });

        uploadedImages.push(uploadedImage.url);
    }

    console.log(uploadedImages);

    const newCar = req.body;

    try {
        await Car.create({ ...newCar, images: uploadedImages });

        res.status(200).json({
            status: "Success",
            message: "Successfully added car data",
            isSuccess: true,
            data: { ...newCar, images: uploadedImages },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to add car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

module.exports = {
    createCar,
    getAllCars,
    getCarById,
    deleteCarById,
    updateCar,
};
