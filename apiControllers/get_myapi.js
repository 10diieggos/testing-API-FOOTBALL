//this endpoint consumes paid API
const { RAPIDAPI_KEY } = process.env;
//express
const express = require('express');
const router = express.Router();
//prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//axios
const axios = require("axios");

// TIMEZONE ROUTES
router.get('/timezones', async (req, res) => {
  const response = await find('api-football-v1.p.rapidapi.com/v2/timezone')
  const updated = response[0]['headers'].date
  const timezones = response[0]['data'].api.timezone
  const results = response[0]['data'].api.results
  res.send({ results, timezones, updated })
})

router.get('/timezone/:search', async (req, res) => {
  let { search } = req.params
  const response = await find('api-football-v1.p.rapidapi.com/v2/timezone')
  const updated = response[0]['headers'].date
  let timezones = response[0]['data'].api.timezone
  timezones = timezones.filter(timezone => {
    n = timezone.search(search)
    return n >= 0
  })
  res.send({results: timezones.length, timezones, updated})
})

router.put('/timezones', async (req, res) => {
  let { origin } = req.body
  let response = await axiosget(origin)
  const { headers, data } = response
  let saved = await find(origin)
  if (saved.length) {
    saved = await update(origin, headers, data)
    res.send(saved)
  } else {
    saved = await create(origin, headers, data)
    res.send(saved)
  }
})

// SEASONS ROUTES

router.get('/seasons', async (req, res) => {
  const response = await find('api-football-v1.p.rapidapi.com/v2/seasons')
  const updated = response[0]['headers'].date
  const seasons = response[0]['data'].api.seasons
  const results = response[0]['data'].api.results
  res.send({ results, seasons, updated })
})

router.put('/seasons', async (req, res) => {
  let { origin } = req.body
  let response = await axiosget(origin)
  const { headers, data } = response
  let saved = await find(origin)
  if (saved.length) {
    saved = await update(origin, headers, data)
    res.send(saved)
  } else {
    saved = await create(origin, headers, data)
    res.send(saved)
  }
})

// SEASON ROUTES
// MODULAR FUNCTIONS ==========================================================

async function find(origin) {
  let data = await prisma.mydbtable.findMany({ where: { origin } })
  return data
}

async function update(origin, headers, data) {
  const response = await prisma.mydbtable.updateMany({ 
    where: { origin },
    data: {
      headers,
      data
    }
  })
  return response
}

async function create(origin, headers, data) {
  const response = await prisma.mydbtable.create({ 
    data: {
      origin,
      headers,
      data
    }
  })
  return response
}

async function axiosget(endpoint) {
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
  return response
}

    
// MODULAR FUNCTIONS ==========================================================

router.put('/database/api', async (req, res) => {
  const { endpoint } = req.body
    
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
  console.log(response);     
  const { headers, data } = response

  let saved = await prisma.mydbtable.findMany({where: {origin}})
  console.log(saved.length)
  if (saved.length) {
    await prisma.mydbtable.updateMany({ 
      where: { origin },
      data: {
        headers,
        data
      }
    });
  } else {
      await prisma.mydbtable.create({ 
        data: {
          origin,
          headers,
          data
        }
      });
  }

          
  const newdbdata = await prisma.mydbtable.findMany({where: {origin}})
  console.log("Saved in Database: ", newdbdata);
  res.send(newdbdata);
  
})
      
router.get('/database/api/:parameters', async (req, res) => {
  let { parameters }  = req.params
  endpoint = parameters.replace(/\u0028bar\u0029/g, '/')
  console.log(endpoint)
  const dbdata = await prisma.mydbtable.findMany({where: {endpoint}})
  console.log(dbdata);
  res.send(dbdata);
})

router.put('/database/teams', async (req, res) => {
  const { endpoint, teams } = req.body

  let saved = await prisma.mydbtable.findMany({ where: { endpoint } })
  
  if (saved.length) {
    await prisma.mydbtable.updateMany({ 
      where: { endpoint },
      data: {
        endpoint,
        headers: new Date(),
        data: teams
      }
    });
  } else {
      await prisma.mydbtable.create({ 
        data: {
          endpoint,
          headers: new Date(),
          data: teams
        }
      });
  }
  res.send('compiled on database')
})



module.exports = router;