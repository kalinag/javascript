const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//music
const songs = [
    {
        name:'Vicetone-Nevada',
        displayName: 'Nevada',
        artist: 'Vicetone',
    },
    {
        name:'Aero_Chord-Surface',
        displayName: 'Surface',
        artist: 'Aero Chord',
    },
    {
        name:'Hellberg_Deutgen-The_End',
        displayName: 'The End',
        artist: 'Hellberg & Deutgen',
    },
    {
        name:'PIXL-Buzz_Kill',
        displayName: 'Buzz Kill',
        artist: 'PIXL',
    }
]

//check 
let isPlaying = false

//current song
let songIdx = 0;

//play 
const playSong = () =>{
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    isPlaying = true
}

//pause
const pauseSong=() =>{
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');

    isPlaying = false
}


//update Dom 
const loadSong=(song) =>{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}



//next song
const nextSong=() =>{
    songIdx ++;
    if(songIdx > songs.length-1) {
        songIdx = 0;
    }
    loadSong(songs[songIdx]);
    playSong();
}
//prev song
const prevSong=() =>{

    songIdx --;
    if(songIdx < 0) {
        songIdx = songs.length -1;
    }
    loadSong(songs[songIdx]);
    playSong();
}



//update progress bar and time

const updateProgressBar=(e) =>{
    if (isPlaying) {
        const { duration, currentTime }=e.srcElement;

        //update progress bar
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`; 

        //calculate duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds<10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //calc current time
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds<10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

//set progress bar
const setProgressBar=(e) =>{
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width)*duration;

}

//on load select first song

loadSong(songs[songIdx]);

//event listeners 
playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);
