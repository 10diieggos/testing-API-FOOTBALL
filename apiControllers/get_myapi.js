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
// TIMEZONE ROUTES




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




// COUNTRIES ROUTES
router.get('/countries', async (req, res) => {
  const response = await find('api-football-v1.p.rapidapi.com/v2/countries')
  const updated = response[0]['headers'].date
  const countries = response[0]['data'].api.countries
  const results = response[0]['data'].api.results
  res.send({ results, countries, updated })
})

router.get('/country/:search', async (req, res) => {
  let { search } = req.params
  console.log(search);
  const response = await find('api-football-v1.p.rapidapi.com/v2/countries')
  const updated = response[0]['headers'].date
  let countries = response[0]['data'].api.countries
  countries = countries.filter(country => {
    n = country.country.search(search)
    return n >= 0
  })
  res.send({results: countries.length, countries, updated})
})

router.put('/countries', async (req, res) => {
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
// COUNTRIES ROUTES





// LEAGUES ROUTES
router.get('/leagues', async (req, res) => {
  const response = await find('api-football-v1.p.rapidapi.com/v2/leagues')
  const updated = response[0]['headers'].date
  const leagues = response[0]['data'].api.leagues
  const results = response[0]['data'].api.results
  res.send({ results, leagues, updated })
})

router.get('/league/By/Id/:id', async (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  const response = await find('api-football-v1.p.rapidapi.com/v2/leagues')
  const updated = response[0]['headers'].date
  const leagues = response[0]['data'].api.leagues
  let league = leagues.filter(league => {
    return league.league_id == id
  })
  res.send({ results: league.length, league, updated })
})

router.get('/leagues/By/Search/:NameOrCountry', async (req, res) => {
  let search = req.params.NameOrCountry
  const response = await find('api-football-v1.p.rapidapi.com/v2/leagues')
  const updated = response[0]['headers'].date
  const leagues = response[0]['data'].api.leagues
  let league = leagues.filter(arr => {
    let n = arr['name'].search(search)
    let p = arr['country'].search(search)
    return n >= 0 || p >= 0
  })
  res.send({ results: league.length, league, updated })
})

router.get('/leagues/By/Country/:country', async (req, res) => {
  let {country} = req.params
  const response = await find('api-football-v1.p.rapidapi.com/v2/leagues')
  const updated = response[0]['headers'].date
  let leagues = response[0]['data'].api.leagues
  leagues = leagues.filter(league => {
    return league.country == country
  })
  res.send({ results: leagues.length, leagues, updated })
})

router.get('/leagues/By/Country/Season/:country/:season', async (req, res) => {
  let { country, season } = req.params
  season = parseInt(season)
  const response = await find('api-football-v1.p.rapidapi.com/v2/leagues')
  const updated = response[0]['headers'].date
  let leagues = response[0]['data'].api.leagues
  leagues = leagues.filter(league => {
    return league.country == country && league.season == season
  })
  res.json({ results: leagues.length, leagues, updated })
})
// LEAGUES ROUTES


//TEAMS ROUTES
router.put('/teams', async (req, res) => {
  let { origin } = req.body
  const response = await find('api-football-v1.p.rapidapi.com/v2/countries')
  const countries = response[0]['data'].api.countries

  let Teams = []
  for (country of countries) {
      let neworigin = `${origin}/${country.country}`
      teams = await find(neworigin)
      let t = teams[0].data.api.teams
      Teams = Teams.concat(t)
  }
  
  await update("teams", {"updated": new Date()}, Teams)

  let v = await find('teams')
  res.send(v)

  // let arrs1 = countries.slice(0, 30)
  // res.send(arrs1);
  // let arrs2 = data.api['countries'].slice(30, 60)
  // console.log(arrs2);
  // let arrs3 = data.api['countries'].slice(60, 90)
  // console.log(arrs3);
  // let arrs4 = data.api['countries'].slice(90, 120)
  // console.log(arrs4);
  // let arrs5 = data.api['countries'].slice(120, 150)
  // console.log(arrs5);

    


    // let teams = await get_all_teams_from_each_country()
    // let total = teams.length
    // let limit = Math.ceil(total/40)
    // let start = 0
    // let end  = start + limit
    // arrs1 = teams.slice(start, end)

    // console.log(arrs1);
    // teams = arrs1
    // let message = await axios.put(`http://${host}:${port}/database/teams/`, {endpoint: 'teams', teams})
    // console.log(message);

  // } else { console.log('Nothing in database, Call from API!'); }
})

router.get('/team/by/id/:id', async (req, res) => {
  let {id} = req.params
  let teams = await find('teams')
  teams = teams[0].data
  team = teams.filter(team => {
    return team.team_id == id
  })
  res.send(team)
})

router.get('/teams/by/country/name/:country/:name', async (req, res) => {
  let { country, name } = req.params
  console.log(country);
  console.log(name);
  let teams = await find('teams')
  teams = teams[0].data
  team = teams.filter(arr => {
    return arr.country == country && arr.name == name
  })
  res.json(team)
})
//TEAMS ROUTES



//STANDINGS ROUTES
router.get('/standings/:league_id', async (req, res) => {
  let { league_id } = req.params
  const response = await find(`api-football-v1.p.rapidapi.com/v2/leagueTable/${league_id}`)
  const updated = response[0]['headers'].date
  const standings = response[0]['data'].api.standings
  const results = response[0]['data'].api.results
  res.send({ results, standings, updated })
})

router.put('/standings', async (req, res) => {
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

//STANDINGS ROUTES




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

module.exports = router;