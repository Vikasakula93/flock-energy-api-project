const express = require("express");
const cors = require("cors");

const meterRoutes = require("./routes/meterRoutes");


const app = express();


app.use(cors());

app.use(express.json());


// Home route
app.get("/", (req, res) => {

    res.json({
        message: "Flock Energy API is running"
    });

});


// Health check
app.get("/health", (req, res) => {

    res.json({
        status: "ok",
        service: "Urja Meter API"
    });

});


// Meter API routes
app.use("/api/v1/meters", meterRoutes);


module.exports = app;