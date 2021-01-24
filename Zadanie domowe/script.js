

function createLyricsDiv(lyrics) {
    const div = document.createElement("div");
    div.innerText = lyrics;
    return div;
}

function findLyrics() {

    const artist = document.getElementById("artist").value;
    const song = document.getElementById("song").value;
    const lyricsDiv = document.getElementById("lyrics");

    lyrics.innerHTML = "";

    axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).then(response => {

        const lyrics = createLyricsDiv(response.data.lyrics);

        lyricsDiv.append(lyrics);
    })
}

