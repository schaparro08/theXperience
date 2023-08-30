var searchButton = document.getElementById("search1");
let genre = document.getElementById('music-genre');

let clientID = '8ccc0ced1ff647858ce389e5b4334f6d'
let clientSecretID = '26ec939798db4170ab988d35ede1f6c6'
let start = document.getElementById('getId');
let accessToken = 'BQDJygGcxyRV5AEna0D6ZJV1Y9yig5CLbBx07FaDoxAgHjjZqLg__vk2a2G08FmqwOfIo2HfpOXrHVqazDtVbaVIvNCwkckQIjmCPa2HZWe7Q46Rxy0'

function getResults() {
    let artist = document.getElementById('artist-name');
    let person = artist.value;
    // let genre = documnet.getElementById('music-genre');
    // let genreType = genre.value;
    // if (person == null) {
    //     // if person is empty use the genre fetch 
    // } else if ( person !== null) {
    //     // if the person does have somebody then use it. 
    // } else {
    //     // if neither person nor gnere have any content then tell the dumbass user to put something in, can't search for casper -_-
    // }
    console.log(person)
    fetch('https://api.spotify.com/v1/search?q=' + person + '&type=artist&limit=1', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }
    })
        .then((response) => {
            return response.json()
                .then(data => {
                    console.log(data)
                    let artistID = data.artists.items[0].id
                    getSongs(artistID)
                    test(person)
                });
        })
}

function getSongs(artistID) {
    fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?market=US', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => { console.log(data) });
}


function access() {
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: 'grant_type=client_credentials&client_id=8ccc0ced1ff647858ce389e5b4334f6d&client_secret=26ec939798db4170ab988d35ede1f6c6',
    })
        .then(function (response) {
            return console.log(response.json());
        })
}

function test(person) {
    fetch('https://api.seatgeek.com/2/events?performers.slug=' + person + '&client_id=MzYxNDMxMTd8MTY5MzM1MzQxNS45NTA3ODU', {
        method: 'GET',
    })
        .then(function (response) {
            return console.log(response.json())
        })
}



$(searchButton).click(function (e) {
    e.preventDefault();
    $("#body1").hide();
});




start.onclick = access;
searchButton.addEventListener('click', getResults);
searchButton.onclick = test;
