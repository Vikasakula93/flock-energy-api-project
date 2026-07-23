const dotenv = require("dotenv");

dotenv.config();

const config = {

    port: process.env.PORT || 5055,

    urjaPortal: {

        url: process.env.URJA_PORTAL_URL,

        username: process.env.URJA_USERNAME,

        password: process.env.URJA_PASSWORD,

        sessionCookie: process.env.URJA_SESSION_COOKIE
    }

};

module.exports = config;