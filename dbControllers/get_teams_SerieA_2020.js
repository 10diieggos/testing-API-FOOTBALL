//this endpoint consumes local database
//express
const express = require('express');
const router = express.Router();
//prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



router.get('/teams/SerieA/2020', async (req, res) => {
  
  try {
          
    let row = await prisma.teams_SerieA_2020.findMany();
    let { teams } = row[0]
   
    res.json(teams)
    
    } catch (error) {
      res.json(error);
    };

});

module.exports = router;