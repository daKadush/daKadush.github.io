// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)
                        
const USERNAME = "thecodaze"; // Put your LastFM username here
const BASE_URL = `https://lastfm-last-played.biancarosa.com.br/${USERNAME}/latest-song`;

const getTrack = async () => {
    const request = await fetch(BASE_URL);
    const json = await request.json();
    let status

    let currentlyplaying

    let isPlaying = json.track['@attr']?.nowplaying || false;

    if(!isPlaying) {
        // Trigger if a song isn't playing
        
        console.log("NOT PLAYING")
        document.getElementById("listening").innerHTML = `
        <p id="trackStatus">Last played:</p>
        <img src="${json.track.image[2]['#text']}">
        <div id="trackInfo">
        <h3 id="trackName">${json.track.name}</h3>
        <p id="artistName">by ${json.track.artist['#text']}</p>
        </div>
        `
        return;
    } else {
        // Trigger if a song is playing
        currentlyplaying = "Currently listening to:"
        console.log("PLAYING")
    }

    // Values:
    // COVER IMAGE: json.track.image[1]['#text']
    // TITLE: json.track.name
    // ARTIST: json.track.artist['#text']

    document.getElementById("listening").innerHTML = `
    <p id="trackStatus">${currentlyplaying}</p>
    <img src="${json.track.image[2]['#text']}" id="coverart">
    <div id="trackInfo">
    <h3 id="trackName">${json.track.name}</h3>
    <p id="artistName">by ${json.track.artist['#text']}</p>
    </div>
    `
};

getTrack();
setInterval(() => { getTrack(); }, 10000);