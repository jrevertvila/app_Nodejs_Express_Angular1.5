const axios = require('axios');
const fetch = require('node-fetch')
let graphUrl = 'http://localhost:3001/api/graphql'

exports.getWishlistUser = async (query) => {
  console.log("entra");
  console.log(query);
  console.log(graphUrl);
  // return await axios.post('http://localhost:3001/api/graphql', {
  //     query:query
  // })
  //     .then(function (res) {
  //         return res.data.item;
  //     })
  //     .catch(function (err) {
  //         console.log('Error de conexión ' + err);
  //     });

  return await fetch('http://localhost:3001/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: query }),
  })
    .then((response) => response.json())

    .then((data) => {
      console.log('Success:', data);
      console.log(data);
      return data;
    })

    .catch((error) => {
      console.error('Error:', error);
    });

  // axios({
  //     url: 'http://localhost:3001/api/graphql',
  //     method: 'get',
  //     data: {
  //       query: query
  //     }
  //   }).then((result) => {
  //     console.log(result.data)
  //   });
}