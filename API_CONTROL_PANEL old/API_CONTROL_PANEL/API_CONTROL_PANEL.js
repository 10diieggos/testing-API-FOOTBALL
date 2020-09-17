const host = '0.0.0.0'
const port = '80'




//TIMEZONE BUTTON FUNCTIONS==============================================================

async function searchTimezones(id) {
  let valueSearch = getValue(id)
  const response = await axiosget(`timezone/${valueSearch}`)
  console.log(response);
}

async function consoleLogTimezones() {
  const timezones = await getTimezones()
  console.log(timezones);
}

async function updateTimezones(apiurl) {
  let url = getValue(apiurl)
  let response = await axiosput('timezones', url)
  cl(response)
}
//TIMEZONE BUTTON FUNCTIONS==============================================================




//SEASONS BUTTON FUNCTIONS==============================================================

async function consoleLogSeasons() {
  const seasons = await getSeasons()
  console.log(seasons);
}

async function updateSeasons(apiurl) {
  let url = getValue(apiurl)
  let response = await axiosput('seasons', url)
  cl(response)
}

//SEASONS BUTTON FUNCTIONS==============================================================




//COUNTRIES BUTTON FUNCTIONS==============================================================
async function consoleLogCountries() {
  const countries = await getCountries()
  console.log(countries);
}

async function searchCountries(id) {
  let valueSearch = getValue(id)
  const response = await axiosget(`country/${valueSearch}`)
  console.log(response);
}

async function updateCountries(apiurl) {
  let url = getValue(apiurl)
  let response = await axiosput('timezones', url)
  cl(response)
}

//COUNTRIES BUTTON FUNCTIONS==============================================================



//LEAGUES BUTTON FUNCTIONS==============================================================
async function consoleLogLeagues() {
  const leagues = await getLeagues()
  console.log(leagues);
}

async function getLeagueByLeagueId(id) {
  id = getValue(id)
  let league = await axiosget(`league/By/Id/${id}`)
  cl(league)
}

async function getLeaguesBySearchNameorCountry(id) {
  id = getValue(id)
  let leagues = await axiosget(`leagues/By/Search/${id}`)
  cl(leagues)
}

async function getLeaguesByCountry(id) {
  id = getValue(id)
  let leagues = await axiosget(`leagues/By/Country/${id}`)
  cl(leagues)
}

//LEAGUES BUTTON FUNCTIONS==============================================================





//TEAMS BUTTON FUNCTIONS==============================================================
async function updateAllTeams(apiurl) {
  let url = getValue(apiurl)
  let response = await axiosput('teams', url)
  cl(response)
}

async function getTeamById (id) {
  id = getValue(id)
  let team = await axiosget(`team/by/id/${id}`)
  cl(team)
}

//TEAMS BUTTON FUNCTIONS==============================================================



//RETURN DATA FUNCTIONS========================================================

async function getTimezones() {
  const timezones = await axiosget('timezones')
  return (timezones);
}

async function getSeasons() {
  const seasons = await axiosget('seasons')
  return (seasons);
}

async function getCountries() {
  const countries = await axiosget('countries')
  return (countries);
}

async function getLeagues() {
  const leagues = await axiosget('leagues')
  return (leagues);
}

//RETURN DATA FUNCTIONS========================================================

// MODULAR FUNCTIONS===========================================================

function cl(params) {
  console.log(params)
}

function getValue(id) {
  const value = document.getElementById(id).value
  return value
}

function parseOrigin(url, param) {
  let origin
  if (param) {
    origin = `${url}${param}`
  } else {
    origin = `${url}`
  }
  origin = origin.replace(/\u002F/g, '(bar)')
  return origin
}
// MODULAR FUNCTIONS===========================================================

//AXIOS CALLS FUNCTIONS ==========================================================
async function axiosget(endpoint) {
  const response = await axios.get(`http://${host}:${port}/${endpoint}`)
  if (response.data) {
    return response.data
  }
}

async function axiosput(endpoint, origin) {
  const response = await axios.put(`http://${host}:${port}/${endpoint}`, {origin})
  if (response.data) {
    return response.data
  }
}