// Sample audio tracks (replace with your actual audio file paths)
const tracks = [
    {
        title: "Track 1",
        src: "./assets/track1.mp3"  // Corrected path typo ("assests" to "assets")
    },
    {
        title: "Track 2",
        src: "./assets/track2.mp3"
    },
    {
        title: "Track 3",
        src: "./assets/track3.mp3"
    }
];

let currentTrackIndex = 0;
const audio = new Audio(tracks[currentTrackIndex].src);
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const progressBar = document.querySelector(".progress-bar");
const currTimeDisplay = document.querySelector(".curr-time");
const totalTimeDisplay = document.querySelector(".total-time");

// Load the current track and update UI
function loadTrack() {
    audio.src = tracks[currentTrackIndex].src;
    audio.load();
    totalTimeDisplay.textContent = formatTime(audio.duration);
    currTimeDisplay.textContent = "00:00";
}

// Format time function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Play track function
function playTrack() {
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
}

// Pause track function
function pauseTrack() {
    audio.pause();
    playButton.classList.remove("hide");
    pauseButton.classList.add("hide");
}

// Next track function
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
    playTrack();
}

// Previous track function
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack();
    playTrack();
}

// Update progress bar and time display
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Event listeners for buttons
playButton.addEventListener("click", playTrack);
pauseButton.addEventListener("click", pauseTrack);
nextButton.addEventListener("click", nextTrack);
prevButton.addEventListener("click", prevTrack);

// Seek functionality for progress bar
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Load the initial track
loadTrack();
