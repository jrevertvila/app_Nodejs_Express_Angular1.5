const fetch = require('node-fetch');
const restUrl = 'http://localhost:3000/api/';


exports.getUser = (slug) => {
    console.log(slug);
    // console.log(req);
    fetch(restUrl + 'user', {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify({ slug: slug }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

}
