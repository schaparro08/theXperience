let genre = document.getElementById('music-genre');
let artist = document.getElementById('artist-name');
let clientID = '8ccc0ced1ff647858ce389e5b4334f6d'
let clientSecretID = '26ec939798db4170ab988d35ede1f6c6'
let start = document.getElementById('getId');
let accessToken = 'BQCyhmTYWO61T-i8CxDB1dIYKPpqEqpJRUpKhUkHU8tzVnQdryFj_QJ8ra1zsID-rYTkT9zT3AS-MiPzevqF2eN_udRre_5VEpJlUMkCuoRGf9Aw1qA'

function getResults() {

    fetch('https://api.spotify.com/v1/artists/' + artist, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}


function access() {
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
                'Content-type': 'application/x-www-form-urlencoded',

        },
        body: 
            'grant_type=client_credentials&client_id=8ccc0ced1ff647858ce389e5b4334f6d&client_secret=26ec939798db4170ab988d35ede1f6c6',
        
    })
    .then(function (response) {
        return console.log(response.json());
    })
}

start.onclick = access;