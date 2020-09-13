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


router.post('/myapi/:from', async (req, res) => {
  const { from } = req.params
  const { endpoint } = req.body
  console.log(from, endpoint);
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
        
        const { headers, data } = response

          
          await prisma.mydbtable.deleteMany({ where: { endpoint } });
          
          
          await prisma.mydbtable.create({
            data: {
              endpoint,
              headers,
              data
            },
          });
          
          const newdbdata = await prisma.mydbtable.findMany({where: {endpoint}})
          console.log(newdbdata);
          res.send(newdbdata);
          
          break;
        
  
      
      case "database":
       
          const dbdata = await prisma.mydbtable.findMany({where: {endpoint: endpoint}});
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