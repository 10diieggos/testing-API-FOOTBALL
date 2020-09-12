//this endpoint consumes paid API

const { RAPIDAPI_KEY } = process.env;
const league_id = '1396'
//express
const express = require('express');
const router = express.Router();
//prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//axios
const axios = require("axios");


router.get('/teams/from/league/id', async (req, res) => {
  
  try {
    const response = await axios({
      "method": "GET",
      "url": `https://api-football-v1.p.rapidapi.com/v2/teams/league/${league_id}`,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": RAPIDAPI_KEY,
        "useQueryString": true
      }
    })
    const teams = response.data.api;
    
    await prisma.teams_SerieA.deleteMany();
    
    await prisma.teams_SerieA.create({
      data: {
        teams,
      },
    });
    
    res.json(response);
    
    } catch (error) {
      res.json(error);
    };
    
  

});

module.exports = router; 