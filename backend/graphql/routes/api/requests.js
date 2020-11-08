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

exports.wishlistToUser = (data, token) => {
    // console.log(data);
    const body = {
        user: {
            data
        },

    };
    fetch(restUrl + '/user', {
        method: 'PUT',
        headers: {
            'Authorization': '' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { wishlist: data } }),
    })
        .then((response) => response.json())

        .then((data) => {
            console.log('Success:', data);
            console.log(data);
        })

        .catch((error) => {
            console.error('Error:', error);
        });

}

exports.getWishlisted = () => {
    console.log("entra");
    axios.get(restUrl + '/user/wishlisted', {
        responseType: 'json'
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log('Error de conexión ' + err);
        });
}