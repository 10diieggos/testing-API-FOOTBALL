//.env
const { SERVER_PORT, HOST, RAPIDAPI_KEY } = process.env

//axios
const axios = require("axios");

//express
const express = require('express');
const app = express();
//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cors
const cors = require('cors');
app.use(cors());


//router apiControllers
const get_leagues_from_country = require('./apiControllers/get_myapi');
app.use('/', get_leagues_from_country);


app.listen(SERVER_PORT, HOST, () => {
  console.log('Servidor rodando');
});