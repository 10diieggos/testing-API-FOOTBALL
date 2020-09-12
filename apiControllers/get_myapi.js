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


router.get('/myapi/:from/:newendpoint', async (req, res) => {
  const { from, newendpoint } = req.params
  console.log(from, newendpoint);
  const endpoint = newendpoint.replace(/barrasdeendereco/g, '/')
  console.log(endpoint);
  try {
    switch (from) {
      case "api":
        const response = await axios({
          "method": "GET",
          "url": `https://${endpoint}`,
          "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": RAPIDAPI_KEY,
            "useQueryString": true
          }
        })

        const {headers, data} = response

        await prisma.timezone.deleteMany();
        
        await prisma.timezone.create({
          data: {
            headers,
            data
          },
        });
        
        const newdbdata = await prisma.timezone.findMany();
        console.log(newdbdata);
        res.send(newdbdata);
        
        break;
      
      case "database":
        const dbdata = await prisma.timezone.findMany();
        console.log(dbdata);
        res.send(dbdata);
       break;
    }

  } catch (error) {
    console.log(error);
    res.json(error);
  };
    
  

});


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