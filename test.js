const axios = require('axios');
axios({
  "method":"GET",
  "url":"https://mourits-lyrics.p.rapidapi.com/",
  "headers":{
  "content-type":"application/octet-stream",
  "x-rapidapi-host":"mourits-lyrics.p.rapidapi.com",
  "x-rapidapi-key":"1e6ac5a0femshc7c495d384868a7p1d4c6bjsn42687eb8b2ea"
  },"params":{
  "artist":"Bon Jovi",
  "song":"Livin' on a prayer"
  }
  })
  .then((response)=>{
    console.log(response)
  })
  .catch((error)=>{
    console.log(error)
  })
