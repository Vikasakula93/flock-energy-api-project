const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");


require("dotenv").config();


const meterRoutes = require("./routes/meterRoutes");


const app = express();


app.use(cors());
app.use(express.json());



const swaggerDocument = JSON.parse(
    fs.readFileSync("./openapi.json","utf8")
);


app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);



app.use(
    "/api/v1/meters",
    meterRoutes
);



app.get("/",(req,res)=>{

    res.json({
        message:"Flock Energy API Running"
    });

});



const PORT = process.env.PORT || 5055;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});