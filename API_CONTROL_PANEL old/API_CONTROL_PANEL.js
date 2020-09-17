const host = '0.0.0.0'
const port = '80'

async function getAPI(from, url, params) {
  let endpoint = url
  if (params) {
    endpoint = `${endpoint}${params}`
  }
  console.log(endpoint)
  // const  response = await axios.put(`http://${host}:${port}/database/api/`, {endpoint})
  
  const {data, headers } = response.data[0]
  console.log(data);
  console.log(`Data comes from ${from}`)
  console.log(headers["x-ratelimit-requests-remaining"]);
}
    
async function getAll(from, url, id, fix) {
  let endpoint = url
  if (id) {
    form = document.getElementById(id)
    architeture = form.name
    id = form.value
    if (fix) {
      endpoint = `${endpoint}${architeture}${fix}${id}`
    } else {
      endpoint = `${endpoint}${architeture}${id}`
    }
  }
       
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  console.log(endpoint);
  const  response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)
  if (response.data[0]) {
    const {data, headers } = response.data[0]
    console.log(data);
    console.log(`Data comes from ${from}`)
    console.log(headers.date);        
  } else {console.log('Nothing in database, Call from API!');}

      
}
    
async function get(from, url, id, ...params) {
  params = params.toString().split('/')
  console.log(params);
  
  let archteture = params.shift()
  let filter = params.shift()
  
  let endpoint = url
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  console.log(endpoint);
  const  response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)
  
  parameter = document.getElementById(id).value
    
  if (response.data[0]) {

    console.log(archteture);
    console.log(filter);
    const {data, headers } = response.data[0]
    console.log(parameter);  
    
    let arrs = data.api[archteture]     
    arrs = arrs.filter(arr => {
      return arr[filter] == parameter
    })
      console.log(arrs);
      console.log(`Data comes from ${from}`)
      console.log(headers.date);
  } else {console.log('Nothing in database, Call from API!');}

}

async function leagues_team_id_season(from, url) {
  console.log(from);
  let endpoint = url.value;
  const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)
  console.log(response.data[0]);
}

async function leagues_country_code(from, url, id) {
  let code = document.getElementById(id).value
  let endpoint = url.value
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)

  if (response.data[0]) {

    const { data, headers } = response.data[0]
    
    let arrs = data.api['leagues']
    arrs = arrs.filter(arr => {
      return arr['country_code'] == code
    })
    console.log(arrs);
    console.log(`Data comes from ${from}`)
    console.log(headers.date);
  } else { console.log('Nothing in database, Call from API!'); }
}

async function leagues_search(from, url, id) {
  let search = document.getElementById(id).value
  let endpoint = url.value
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)

  if (response.data[0]) {

    const {data, headers } = response.data[0]
    
    let arrs = data.api['leagues']     
    arrs = arrs.filter(arr => {
      let n = arr['name'].search(search)
      let p = arr['country'].search(search)
      return n >= 0 || p >= 0
    })
      console.log(arrs);
      console.log(`Data comes from ${from}`)
      console.log(headers.date);
  } else {console.log('Nothing in database, Call from API!');}
}

async function leagues_country_season(from, url, id1, id2) {
  let country = document.getElementById(id1).value
  let season = document.getElementById(id2).value
  let endpoint = url.value
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)

  if (response.data[0]) {

    const { data, headers } = response.data[0]
    
    let arrs = data.api['leagues']
    arrs = arrs.filter(arr => {
      return arr['country'] == country && arr['season'] == season
    })
    console.log(arrs);
    console.log(`Data comes from ${from}`)
    console.log(headers.date);
  } else { console.log('Nothing in database, Call from API!'); }
}
async function leagues_country_code_season(from, url, id1, id2) {
  let code = document.getElementById(id1).value
  let season = document.getElementById(id2).value
  let endpoint = url.value
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)

  if (response.data[0]) {

    const { data, headers } = response.data[0]
    
    let arrs = data.api['leagues']
    arrs = arrs.filter(arr => {
      return arr['country_code'] == code && arr['season'] == season
    })
    console.log(arrs);
    console.log(`Data comes from ${from}`)
    console.log(headers.date);
  } else { console.log('Nothing in database, Call from API!'); }
}

async function search_team_by_country(from, url, id) {
  let search = document.getElementById(id).value
  let endpoint = url.value
  console.log(search);
  endpoint = `${endpoint}${search}`
  console.log(endpoint)
  const  response = await axios.put(`http://${host}:${port}/database/api/`, {endpoint})
  
  const {data, headers } = response.data[0]
  console.log(data);
  console.log(`Data comes from ${from}`)
  console.log(headers["x-ratelimit-requests-remaining"]);
}

async function search_team_by_country_name(from, url, id1, id2) {
  const country = document.getElementById(id1).value
  const name = document.getElementById(id2).value
  let endpoint = url.value
  console.log(endpoint);
  endpoint = `${endpoint}/${country}`
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)

  if (response.data[0]) {

    const { data, headers } = response.data[0]
    
    let arrs = data.api['teams']
    arrs = arrs.filter(arr => {
      n = arr['name'].search(name)
      return n >= 0
    })
    console.log(arrs);
    console.log(`Data comes from ${from}`)
    console.log(headers.date);
  } else { console.log('Nothing in database, Call from API!'); }
}

async function search_team_by_team_id(from, url, id) {
  let team_id = getParam(id)
  let endpoint = getEndpoint(url.value, `/${team_id}`)
  axiosget(endpoint)
  // let teams = await get_all_teams_database_array();
  
  team_id = parseInt(team_id)
  let team = teams.filter(t => {
    return t['team_id'] == team_id
  })
  console.log(team);
  
}

//MODULAR FUNCTIONS=====================================================================
function getParam(id) {
  let param = document.getElementById(id).value
  if (param) {
    return param
  } else {
    console.log('nothing returned by param()');
  }
}

function getEndpoint(url, param) {
  let endpoint
  if (param) {
    endpoint = `${url}${param}`
  } else {
    endpoint = `${url}`
  }
  endpoint = endpoint.replace(/\u002F/g, '(bar)')
  return endpoint
}

async function axiosget(endpoint) {
  const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)
  if (response.data[0]) {
    return response.data[0]
  }
}

async function get_all_countries_database_array() {
  let url = document.getElementById('countriesURL').value
  url = getEndpoint(url)
  let countries = await axiosget(url)
  return countries
}

async function get_all_teams_from_each_country() {
  let url = getParam('teamsURL')
  let Countries = await get_all_countries_database_array()
  let { countries } = Countries.data.api
  let endpoints = countries.map(country => {
    endpoint = getEndpoint(`${url}/${country.country}`)
    return endpoint
  })
  
  let teams = []
  for (end of endpoints) {
    t = await axiosget(end)
    if (t) {
      team = t.data.api.teams
      teams = teams.concat(team)
    }
  }
  return teams
}
//MODULAR FUNCTIONS=====================================================================





//DANGER
async function search_all_api_teams(from, url, url2) {
  // let endpoint = url2.value
  // console.log(endpoint);
  // endpoint = endpoint.replace(/\u002F/g, '(bar)')
  // const response = await axios.get(`http://${host}:${port}/database/api/${endpoint}`)
  // if (response.data[0]) {

  //   const { data, headers } = response.data[0]
    
    // let arrs1 = data.api['countries'].slice(0, 30)
    // console.log(arrs1);
    // let arrs2 = data.api['countries'].slice(30, 60)
    // console.log(arrs2);
    // let arrs3 = data.api['countries'].slice(60, 90)
    // console.log(arrs3);
    // let arrs4 = data.api['countries'].slice(90, 120)
    // console.log(arrs4);
    // let arrs5 = data.api['countries'].slice(120, 150)
    // console.log(arrs5);

    
    // endpoint = url.value
    
    // for (country of arrs5) {
    //   let newendpoint = `${endpoint}/${country.country}`
    //   console.log(newendpoint);
    //   let  response2 = await axios.put(`http://${host}:${port}/database/api/`, {endpoint: newendpoint})
    //   let {data, headers } = response2.data[0]
    //   console.log(data);
    //   console.log(`Data comes from ${from}`)
    //   console.log(headers["x-ratelimit-requests-remaining"]);
    // }

    let teams = await get_all_teams_from_each_country()
    let total = teams.length
    let limit = Math.ceil(total/40)
    let start = 0
    let end  = start + limit
    arrs1 = teams.slice(start, end)

    console.log(arrs1);
    teams = arrs1
    let message = await axios.put(`http://${host}:${port}/database/teams/`, {endpoint: 'teams', teams})
    console.log(message);

  // } else { console.log('Nothing in database, Call from API!'); }
  
}