const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "music-player/a.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "music-player/b.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: "music-player/c.mp3"
  }
];

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

// Load a song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
   audio.src = song.src;

  updatePlaylistHighlight();
}

// Play
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}

// Pause
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

// Toggle Play
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong("");
});

// Next
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
});

// Prev
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  updateTimeDisplay();
});

// Seek
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

// Autoplay next
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Update time
function updateTimeDisplay() {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

// Playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentIndex = index;
    loadSong(currentIndex);
    playSong();
  });
  playlistEl.appendChild(li);
});

function updatePlaylistHighlight() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
}

// Init
loadSong(currentIndex);
