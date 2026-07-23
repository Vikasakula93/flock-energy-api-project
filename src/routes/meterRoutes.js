const express = require("express");

const router = express.Router();


const {
    getAllMeters,
    getEnergy,
    getGeo
} = require("../controllers/meterController");



router.get("/",getAllMeters);


router.get("/:meterId/energy",getEnergy);


router.get("/:meterId/geo",getGeo);



module.exports = router;