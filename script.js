const audio = document.getElementById('audioPlayer');
const fileInput = document.getElementById('fileInput');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');
const trackName = document.getElementById('trackName');

let playlist = [];
let currentIndex = 0;

fileInput.addEventListener('change', () => {
  playlist = Array.from(fileInput.files);
  currentIndex = 0;
  loadTrack(currentIndex);
});

function loadTrack(index) {
  const file = playlist[index];
  if (!file) return;
  audio.src = URL.createObjectURL(file);
  trackName.textContent = file.name;
  audio.play();
  playPauseBtn.textContent = '⏸️';
}

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});
