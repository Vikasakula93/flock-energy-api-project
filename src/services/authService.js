const axios = require("axios");
const config = require("../config/config");

let sessionCookie = null;


const urjaClient = axios.create({

    baseURL: config.urjaPortal.url,

    timeout: 10000

});


const login = async () => {

    try {

        console.log("Trying Urja login...");


        const response = await axios.post(

            `${config.urjaPortal.url}/login`,

            new URLSearchParams({

                email: config.urjaPortal.username,

                password: config.urjaPortal.password

            }).toString(),

            {

                headers: {

                    "Content-Type": "application/x-www-form-urlencoded",

                    "Origin": config.urjaPortal.url,

                    "Referer": `${config.urjaPortal.url}/login`,

                    "x-sveltekit-action": "true"

                }

            }

        );

        console.log("LOGIN RESPONSE:", response.status, response.data, response.headers);


        const cookies = response.headers["set-cookie"];


        if(cookies && cookies.length > 0){

            sessionCookie = cookies[0].split(";")[0];

            console.log("Cookie received");

        }


        return true;


    } catch(error){

        console.log(

            "Urja login failed:",

            error.response?.data || error.message

        );

        return false;

    }

};


urjaClient.interceptors.request.use(

    async(request)=>{


        if(!sessionCookie){

            await login();

        }


        if(sessionCookie){

            request.headers.Cookie = sessionCookie;

        }


        return request;

    }

);


module.exports = {

    urjaClient,

    login

};