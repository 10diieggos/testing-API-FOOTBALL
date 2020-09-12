//this terminal consumes internal API
//environment
const { SERVER_PORT, HOST, RAPIDAPI_KEY } = process.env
//express
const express = require('express');
const router = express.Router();
//axios
const axios = require('axios');


router.get('/brazil/serieA', async (req, res) => {
  
  try {
          
    let row = await axios.get(`http://${HOST}:${SERVER_PORT}/leagues/brazil`)
    
    let { leagues } = row.data
    leagues = leagues.filter((league) => {
        return league.name == "Serie A"
    })
      
      res.json({result: leagues.length, leagues });
    
    } catch (error) {
      res.json(error);
    };

});

module.exports = router; 