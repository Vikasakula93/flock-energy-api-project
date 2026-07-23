const {
    getMeters,
    getMeterEnergy,
    getMeterGeo
} = require("../services/urjaClient");


const getAllMeters = async(req,res)=>{

    try{

        const page = req.query.page || 1;
        const query = req.query.q || "";

        const meters = await getMeters(page,query);


        res.json({
            success:true,
            data:meters
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};



const getEnergy = async(req,res)=>{

    try{

        const {meterId}=req.params;

        const data = await getMeterEnergy(meterId);


        res.json({
            success:true,
            meterId,
            data
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:"Unable to fetch energy data"
        });

    }

};



const getGeo = async(req,res)=>{

    try{

        const {meterId}=req.params;


        const data = await getMeterGeo(meterId);


        res.json({
            success:true,
            meterId,
            data
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:"Unable to fetch geo data"
        });

    }

};



module.exports={
    getAllMeters,
    getEnergy,
    getGeo
};