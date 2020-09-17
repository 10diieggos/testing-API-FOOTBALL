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

//RETURN DATA FUNCTIONS========================================================

async function getTimezones() {
  const timezones = await axiosget('timezones')
  return (timezones);
}

async function getSeasons() {
  const seasons = await axiosget('seasons')
  return (seasons);
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