'use strict'

const got = require('got');
const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();

var ValidUrl = require('valid-url');
var Response = require('http-response-object');

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const request = async (url) => {
    try {
        const response = await got(url);
        return { response, content: response.body };
            
    } catch (error) {
        return { error };      
    }
};

async function addressCheckHandler (req, res, next) {
    const url = req.body.url;
    var validityMessage = "";

    const { response, error } = await request(url);

    if (ValidUrl.isUri(url)){
        validityMessage = 'Valid URI';
    } else {
        validityMessage = 'Not a valid URI';
    }

    if (!error) {
        res.send(new Response(response.statusCode, 
            {}, 
            `URL validation ok. Message: ${validityMessage}`,
            url));
    } else {
        res.status(500);
        res.send(new Response(500, 
            {}, 
            `URL validation failed. ${validityMessage}, with inner error message: ${error.code}`,
            url));
    }
};

app.post('/api/v1/checkAddress', addressCheckHandler);
app.listen(PORT, () => { console.log(`URL Checker running on http://localhost:${PORT}`);});

module.exports = app;
