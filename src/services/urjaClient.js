const { urjaClient } = require("./authService");


const getMeters = async(page=1, query="") => {

    const response = await urjaClient.get(
        "/portal/meters/search",
        {
            params:{
                q:query,
                page:page
            }
        }
    );

    return response.data;

};


const getMeterEnergy = async(meterId)=>{

    const response = await urjaClient.get(
        `/portal/meters/${meterId}/energy`
    );

    return response.data;

};


const getMeterGeo = async(meterId)=>{

    const response = await urjaClient.get(
        `/portal/meters/${meterId}/geo`
    );

    return response.data;

};


module.exports = {
    getMeters,
    getMeterEnergy,
    getMeterGeo
};