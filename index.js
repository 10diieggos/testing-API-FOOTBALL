const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const axios = require("axios");

(async () => {
 
  let response = await axios({
    "method":"GET",
    "url":"https://api-football-v1.p.rapidapi.com/v2/countries",
    "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "useQueryString":true
    }
  })

  let { countries } = response.data.api
  console.log(countries);

  // // countries.forEach(async c => {
    
  // //   let { country, code, flag } = c
  // //   await prisma.countries.create({
  // //       data: {
  // //         country,
  // //         code,
  // //         flag
  // //       }
  // //     })


  // });

})()
