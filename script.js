var searchButton = document.getElementById("search1");
let clientID = '8ccc0ced1ff647858ce389e5b4334f6d'
let clientSecretID = '26ec939798db4170ab988d35ede1f6c6'
let start = document.getElementById('getId');
let accessToken = 'BQBHa5zVhYxRdCqommpM1i6Yz7qE9CXPmKSkBEjNq3JF8L7a9LPEu9PgZOb6GCnUG6Zq7BegxEZsa830u9BpbE4VFv9FkiKTrFkEwZeSto3yTPrS5tM'


// function to filter search
function artistOrGenre() {
    let artist = document.getElementById('artist-name');
    let person = artist.value;
    let genre = document.getElementById('music-genre');
    let genreType = genre.value;
    let testing;

    if (person !== null) {
        console.log('well it worked here or got stuck on the first part')
        testing = person
        getResults(testing)
    } else if (genreType !== null) {
        console.log('hey it worked here too or skipped straight to the second part')
        testing = genreType
        getResults(testing)
    } else {
        console.log('welp you tried')
    }
}

// function to the artistID from spotify
function getResults(testing) {
    // let artist = document.getElementById('artist-name');
    // let person = artist.value;
    
    // console.log(person)
    fetch('https://api.spotify.com/v1/search?q=' + testing + '&type=artist&limit=1', {
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
                    getEvents(person)
                });
        })
}

// function for getting the top tracks for an artist from spotify
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

// function for getting access token for spotify 
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


// function for getting events bacak from seatGeek
function getEvents(person) {
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
searchButton.addEventListener('click', artistOrGenre);