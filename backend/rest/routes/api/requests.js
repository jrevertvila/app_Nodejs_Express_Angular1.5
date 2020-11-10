const axios = require('axios');
const fetch = require('node-fetch')
let graphUrl = 'http://localhost:3001/api/graphql'

exports.getWishlistUser = async (query) => { //EN AXIOS NO FUNCIONA

  return await fetch('http://localhost:3001/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query }),
  })
    .then((response) => response.json())

    .then((data) => {
      return data;
    })

    .catch((error) => {
      console.error('Error:', error);
    });

}