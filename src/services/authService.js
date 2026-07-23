const axios = require("axios");

const config = require("../config/config");


const urjaClient = axios.create({

    baseURL: config.urjaPortal.url,

    timeout:10000,

    headers:{
        Cookie: config.urjaPortal.sessionCookie
    }

});


module.exports = {
    urjaClient
};