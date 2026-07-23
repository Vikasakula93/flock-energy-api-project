const cheerio = require("cheerio");


const parseMeterPage = (html) => {

    const $ = cheerio.load(html);


    return {

        meterId: $("#meter-id").text().trim() || null,

        status: $(".status").text().trim() || null,

        raw: html

    };

};


module.exports = {
    parseMeterPage
};