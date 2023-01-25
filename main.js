let playPauseToggle = document.querySelector(".play-pause-toggle");
let controls = document.querySelector(".container-play-btns");
let songPlaying = document.querySelector("audio");
let aLecoute = document.querySelector(".a-lecoute");
let cover = document.querySelector(".cover");

//btns:
let shuffle = document.querySelector(".fa-shuffle") ;
let previous = document.querySelector(".fa-backward-step");
let pauseSong = document.querySelector(".fa-circle-pause");
let next = document.querySelector(".fa-forward-step");
let repeat = document.querySelector(".fa-repeat");
let stopSong = document.querySelector(".stop");

//display of duration and progress:
let currntTime = document.getElementById("timer");
let totalTime = document.querySelector(".total-time");

//range input progress:
let progressBar = document.querySelector("#duration");


let displayArtist = document.querySelector(".artist-display");
let displaySong = document.querySelector(".track-title");

/*******************************OK*********************************/
// display list with data of songs
class Song {
    constructor(source, title, artist, albumTitle, totalTime, cover) {
        this.source = source,
        this.title = title,
        this.artist = artist,
        this.albumTitle = albumTitle,
        this.totalTime = totalTime,
        this.cover = cover
    }
};

let kali = new Song("music/after-the-storm.mp3", "After the Storm", "Kali Uchis", "Isolation", "3:24", "images/kali_uchis.jpg");
let otto = new Song("music/airship-thunderchild.mp3", "Airship Thunderchild", "Otto Halmén", "Tell Me a Story", "1:55", "images/otto_halmen.jpg");
let jorja = new Song("music/blue-lights.mp3", "Blue Lights", "Jorja Smith", "Blue Lights", "4:22", "images/jorja_smith.jpg");
let dolly = new Song("music/jolene.mp3", "Jolene", "Dolly Parton", "Jolene", "2:43", "images/dolly_parton.jpg");
let rickroll = new Song("music/never_gonna_give_you_up.mp3","Never Gonna Give You Up", "Rick Astley", "Whenever You Need Somebody", "3:33", "images/rick_astley.jpg");
let shadow = new Song("music/nobody_speak.mp3", "Nobody Speak", "DJ Shadow feat. Run the Jewels", "The Mountain Will Fall", "3:15", "images/dj_shadow.jpg");
let vexento = new Song("music/now.mp3", "Now", "Vexento", "Now", "5:50", "images/vexento.jpg");
let childish = new Song("music/redbone.mp3", "Redbone", "Childish Gambino", "Awaken, My Love", "5:27", "images/childish_gambino.jpg");
let myuu = new Song("music/tender-remains.mp3", "Tender Remains", "Myuu", "Myuuji", "4:57", "images/myuu.jpg");


let trackListInfo = [kali, otto, jorja, dolly, rickroll, shadow, vexento, childish, myuu];


// artist cells
let artistCell = document.querySelectorAll(".artist");
artistCell.forEach(element => {
    for (i=0; i<trackListInfo.length; i++) {
    artistCell[i].textContent = trackListInfo[i].artist}
});


// song title cells
let titleCell = document.querySelectorAll(".title");
titleCell.forEach(element => {
    for (i=0; i<trackListInfo.length; i++) {
    titleCell[i].textContent = trackListInfo[i].title}
});


// album title cells
let albumCell = document.querySelectorAll(".album");
albumCell.forEach(element => {
    for (i=0; i<trackListInfo.length; i++) {
    albumCell[i].textContent = trackListInfo[i].albumTitle}
});


// duration cells
let totalTimeCell = document.querySelectorAll(".duration");
albumCell.forEach(element => {
    for (i=0; i<trackListInfo.length; i++) {
        totalTimeCell[i].textContent = trackListInfo[i].totalTime}
});


//delete music icon on album cover
let note = document.querySelector(".fa-music")
/**
 * removes the music note from the album cover
 */
function removeNote() {
    if (stopSong.classList.contains("reset")) {
        note.classList.replace("fa-music", "x");
    }
};


//************** click on a song ***************
let rowNumber = document.querySelectorAll(".song");

/**remove css for currently not playing song */
function removeSelected() {
    rowNumber.forEach(element => {
      element.classList.remove("filled");
    })
}

/**add css for currently playing song */
function selected() {
    let source = songPlaying.src;

    for (let i = 0; i < trackListInfo.length; i++) {
          let a = Object.values(trackListInfo[i]).some(s=>source.includes(trackListInfo[i].source)); // checks which object's 'source' value is included in the audio.src
          

        if (a === true) {
          removeSelected();
          rowNumber[i].classList.add("filled")
          } 
        }
  };

rowNumber.forEach(element => {
    element.addEventListener('click', () => {
            //previous songPlaying no longer has css style :
            removeNote();


        progressBar.disabled = false;
        controls.classList.remove("controls-reset");
        shuffle.classList.remove("controls-reset");
        repeat.classList.remove("controls-reset");
        aLecoute.classList.remove("reset");
        stopSong.classList.remove("reset");
        playPauseToggle.classList.replace("fa-circle-play", "fa-circle-pause");
        element.classList.add("filled");

        let songLine = element.firstElementChild.innerHTML; //important : firstElementChild, NOT firstChild bc 1stchild takes into account tabs, returns, spaces after tags (F*ed Up)
        let songIndex = songLine -1; //line # -1

        songPlaying.src = trackListInfo[songIndex].source;
        songPlaying.play();
        totalTime.textContent = trackListInfo[songIndex].totalTime;
        displayArtist.textContent = trackListInfo[songIndex].artist;
        displaySong.textContent = trackListInfo[songIndex].title;
        cover.style.backgroundImage = `url(${trackListInfo[songIndex].cover})`;
        selected();
    });
});


// player off ******************/ 
function noSongPlaying() {

    songPlaying.src="";
    progressBar.disabled = true;

    controls.classList.add("controls-reset");
    shuffle.classList.add("controls-reset");
    repeat.classList.add("controls-reset");
    aLecoute.classList.add("reset");
    stopSong.classList.add("reset");
    playPauseToggle.classList.replace("fa-circle-pause", "fa-circle-play");

    songPlaying.currentTime = 0;

    totalTime.textContent = "";
    displayArtist.textContent = "";
    displaySong.textContent = "";
    cover.style.backgroundImage = `url()`;
    totalTime.textContent = "0:00";
};

//player off when page is loaded :
window.addEventListener("load", noSongPlaying);

//onclick event of stop button :
stopSong.addEventListener("click", () => {
    noSongPlaying();
    note.classList.replace("x", "fa-music")
});

//volume setting :
let volumeLvl = document.querySelector("#volume");

volumeLvl.addEventListener('input', () => {
    songPlaying.volume = volumeLvl.value /100; 
});


//update currentTime in progressBar :
songPlaying.addEventListener('timeupdate', () => {
    progressBar.max = songPlaying.duration;
    progressBar.value = songPlaying.currentTime;
});


//change currentTime on click :
progressBar.addEventListener('input', () => {
    songPlaying.currentTime = progressBar.value;
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/**
 * Toggle to play or pause song
 */
function playPause() {
    progressBar.disabled = false;
    controls.classList.remove("controls-reset");
    shuffle.classList.remove("controls-reset");
    repeat.classList.remove("controls-reset");
    if (playPauseToggle.classList.contains("fa-circle-pause")) {
        songPlaying.pause();
        playPauseToggle.classList.replace("fa-circle-pause", "fa-circle-play");
    } else if (playPauseToggle.classList.contains("fa-circle-play")) {
        songPlaying.play();
        playPauseToggle.classList.replace("fa-circle-play", "fa-circle-pause");
    }
};
    
//onclick event on pause/play btn :
playPauseToggle.addEventListener("click", () => {
    if (totalTime.textContent != "0:00") {
        playPause();
    } else {
        return;
    }
});

/**
 * repeat 1 song
 */
function repeatSong() {
    repeat.classList.toggle("active")
    repeat.classList.replace("fa-repeat", "fa-repeat");
    songPlaying.toggleAttribute("loop");
};

//loop on one song event on repeat btn :
repeat.addEventListener("click", repeatSong);


//random song
shuffle.addEventListener('click', () => {
    shuffle.classList.toggle("active")
  });


/**
 * generates a random song
 */
function shuffleSong() {
    let randomIndex = Math.floor(Math.random() * trackListInfo.length);

    songPlaying.src = trackListInfo[randomIndex].source;
    songPlaying.play();

    totalTime.textContent = trackListInfo[randomIndex].totalTime;
    displayArtist.textContent = trackListInfo[randomIndex].artist;
    displaySong.textContent = trackListInfo[randomIndex].title;
    cover.style.backgroundImage = `url(${trackListInfo[randomIndex].cover})`;
  };




/**allow to go to next song */
function nextSong() {
    let source = songPlaying.src;
    playPauseToggle.classList.replace("fa-circle-play", "fa-circle-pause");

    for (let i = 0; i < trackListInfo.length; i++) {
        let a = Object.values(trackListInfo[i]).some(s=>source.includes(trackListInfo[i].source)); // checks which object's 'source' value is included in the audio.src

        console.log(a);
        if (songPlaying.hasAttribute("loop")) {
            songPlaying.currentTime = 0;
            songPlaying.play();
            break;
        } else if (shuffle.classList.contains("active")) {
            shuffleSong();
            break;
        } else if (a === true && i<trackListInfo.length-1) {
            i++;
            songPlaying.src = trackListInfo[i].source;
            songPlaying.play();


            totalTime.textContent = trackListInfo[i].totalTime;
            displayArtist.textContent = trackListInfo[i].artist;
            displaySong.textContent = trackListInfo[i].title;
            cover.style.backgroundImage = `url(${trackListInfo[i].cover})`;
            break;

        } else if (a === true && i == trackListInfo.length-1) { //if song is last song, go to 1st song
            songPlaying.src = trackListInfo[0].source;
            songPlaying.play();
            
            totalTime.textContent = trackListInfo[0].totalTime;
            displayArtist.textContent = trackListInfo[0].artist;
            displaySong.textContent = trackListInfo[0].title;
            cover.style.backgroundImage = `url(${trackListInfo[0].cover})`;
        };
    };
};

next.addEventListener('click', () => {
    nextSong();
    selected();
    });

songPlaying.addEventListener('ended', nextSong);

/**allow to go to previous song */
function previousSong() {
    let source = songPlaying.src;
    playPauseToggle.classList.replace("fa-circle-play", "fa-circle-pause");

    for (let i = trackListInfo.length-1; i >= 0; i--) {
        let a = Object.values(trackListInfo[i]).some(s=>source.includes(trackListInfo[i].source));
        console.log(a);
        if ((songPlaying.hasAttribute("loop") && songPlaying.currentTime > 2) || songPlaying.currentTime > 2) {
            songPlaying.currentTime = 0;
            songPlaying.play();
            break;
        } else if (shuffle.classList.contains("active")) {
            shuffleSong();
            break;
        } else if (a === true && i>0) {
            i--;
            console.log(a);
            songPlaying.src = trackListInfo[i].source;
            songPlaying.play();


            totalTime.textContent = trackListInfo[i].totalTime;
            displayArtist.textContent = trackListInfo[i].artist;
            displaySong.textContent = trackListInfo[i].title;
            cover.style.backgroundImage = `url(${trackListInfo[i].cover})`;
            break;

        } else if (a === true && i == 0) { //if song is last song, go to 1st song
            let lastSong = trackListInfo.length-1;
            songPlaying.src = trackListInfo[lastSong].source;
            songPlaying.play();

            totalTime.textContent = trackListInfo[lastSong].totalTime;
            displayArtist.textContent = trackListInfo[lastSong].artist;
            displaySong.textContent = trackListInfo[lastSong].title;
            cover.style.backgroundImage = `url(${trackListInfo[lastSong].cover})`;
        };
    };
};

previous.addEventListener('click', () => {
    previousSong();
    selected()
});


/**Song timer */
function timer() {
    let time = songPlaying.currentTime;

    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10);
    if (seconds < 10) {
        currntTime.innerText = minutes + ":0" + seconds;
        time++;
    } else {
        currntTime.innerText = minutes + ":" + seconds;
        time++;
    }
};

setInterval(timer, 1000);

currntTime.addEventListener('timeupdate', timer);





