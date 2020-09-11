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

//router apiControllers
const get_leagues_from_country = require('./apiControllers/get_leagues_from_country');
app.use('/', get_leagues_from_country);

//router apisoccerControllers
const get_leagues_brazil = require('./apisoccerControllers/get_leagues_brazil');
app.use('/', get_leagues_brazil);

const get_brazil_serieA = require('./apisoccerControllers/get_brazil_serieA');
app.use('/', get_brazil_serieA);

const get_teams_from_league_id = require('./apiControllers/get_teams_from_league_id');
app.use('/', get_teams_from_league_id);

app.listen(SERVER_PORT, HOST, () => {
  console.log('Servidor rodando');
});