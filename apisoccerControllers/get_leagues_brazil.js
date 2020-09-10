//this endpoint consumes local database
//express
const express = require('express');
const router = express.Router();
//prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



router.get('/leagues/brazil', async (req, res) => {
  
  try {
          
    let row = await prisma.brasil_leagues.findMany();
    let { leagues } = row[0]
   
    res.json(leagues)
    
    } catch (error) {
      res.json(error);
    };

});

module.exports = router;