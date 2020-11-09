const fetch = require('node-fetch');
const axios = require('axios');
const restUrl = 'http://localhost:3000/api';


exports.checkUser = async (token) => {
    // console.log("TOKEN");
    // console.log(token);

    //https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native

    return await fetch(restUrl + '/user', {
        method: 'GET',
        headers: {
            'Authorization': '' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => { return response });

}

exports.wishlistToUser = async (data, token) => {
    // console.log(data);
    const body = {
        user: {
            data
        },

    };
    return await fetch(restUrl + '/user', {
        method: 'PUT',
        headers: {
            'Authorization': '' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: data }),
    })
        .then((response) => response.json())

        .then((data) => {
            console.log('Success:', data);
            // console.log(data);
            return data;
        })

        .catch((error) => {
            console.error('Error:', error);
        });

}

exports.getWishlisted = async () => {
    console.log("entra");
    return await axios.get(restUrl + '/wishlisted', {
        responseType: 'json'
    })
        .then(function (res) {
            return res.data.item;
        })
        .catch(function (err) {
            console.log('Error de conexión ' + err);
        });
}