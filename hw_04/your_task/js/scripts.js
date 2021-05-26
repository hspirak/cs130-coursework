const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const playTrack = (ev) => {
    //console.log(ev.currentTarget);
    const elem = ev.currentTarget;
    const previewURL = elem.dataset.previewTrack;
    console.log(previewURL+ "THIS IS THE PREVIEW URL")
    if(previewURL!="null"){
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    }
    else {
        console.log("there is not preview aailable for this track");
    }

}


const getTracks = (term) => {
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
        let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}&limit=5`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#tracks').innerHTML = '';
                //do something with data
                //console.log(data);
                if(!data[0])
                {
                    document.querySelector('#tracks').innerHTML = `No tracks found for "${term}"` 
                    return;
                }
                for(const track of data) {
                    //create HTML element
                    const template = `<section class="track-item preview" data-preview-track=${track.preview_url} onclick="playTrack(event);">
                    <img src=${track.album.image_url}>
                    <i class="fas play-track fa-play" aria-hidden="true"></i>
                    <div class="label">
                        <h3>${track.name}</h3>
                        <p>
                            ${track.artist.name}
                        </p>
                    </div>
                </section>`
                    document.querySelector('#tracks').innerHTML += template;
                    //console.log(track);
                }
            })
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
        let url = `https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#albums').innerHTML = '';
                if(!data[0])
                {
                    document.querySelector('#albums').innerHTML = `No albums found for "${term}"` 
                    return; 
                }
                //do something with data
                //console.log(data);
                for(const album of data) {
                    //create HTML element
                    const template = `<section class="album-card" id=${album.id}>
                    <div>
                        <img src=${album.image_url}>
                        <h3>${album.name}</h3>
                        <div class="footer">
                            <a href=${album.spotify_url} target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`
                    document.querySelector('#albums').innerHTML += template;
                    //console.log(track);
                }
            })
};

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);
        let url = `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}&limit=1`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#artist').innerHTML = '';
                if(!data[0])
                {
                    document.querySelector('#artist').innerHTML = `No artists found for "${term}"` 
                    return;
                }
                const artist = data[0];
                //do something with data
                console.log("THIS IS YOUR DATA"+artist.name);
                    const template = `<section class="artist-card" id="${artist.id}">
                    <div>
                        <img src=${artist.image_url}>
                        <h3>${artist.name}</h3>
                        <div class="footer">
                            <a href=${artist.spotify_url} target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`
                    document.querySelector('#artist').innerHTML += template;
                    console.log(track);
    
            })
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};