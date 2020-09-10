//this endpoint consumes paid API

const { RAPIDAPI_KEY } = process.env;
const country = 'Brazil'
//express
const express = require('express');
const router = express.Router();
//prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//axios
const axios = require("axios");


router.get('/leagues/from/country', async (req, res) => {
  
  try {
    const response = await axios({
      "method": "GET",
      "url": `https://api-football-v1.p.rapidapi.com/v2/leagues/country/${country}`,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": RAPIDAPI_KEY,
        "useQueryString": true
      }
    })
    const leagues = response.data.api;
    
    await prisma.brasil_leagues.deleteMany();
    
    await prisma.brasil_leagues.create({
      data: {
        leagues,
      },
    });
    
    res.json(response);
    
    } catch (error) {
      res.json(error);
    };
    
  

});

module.exports = router; 