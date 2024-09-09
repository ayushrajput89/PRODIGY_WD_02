let startTime = 0;
let currentTime = 0;
let pausedTime = 0;
let isRunning = false;
let intervalId = null;

const startStopButton = document.getElementById('start-stop-button');
const lapButton = document.getElementById('lap-button');
const resetButton = document.getElementById('reset-button');
const lapList = document.getElementById('lap-list');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');

startStopButton.addEventListener('click', () => {
  if (!isRunning) {
    startTime = new Date().getTime();
    isRunning = true;
    startStopButton.textContent = 'Pause';
    intervalId = setInterval(() => {
      currentTime = new Date().getTime() - startTime + pausedTime;
      updateDisplay();
    }, 10);
  } else {
    pausedTime = currentTime;
    clearInterval(intervalId);
    isRunning = false;
    startStopButton.textContent = 'Start';
  }
});
lapButton.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = formatTime(currentTime);
    lapTimes.push(lapTime);
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapListItem);
  }
});

resetButton.addEventListener('click', () => {
  startTime = 0;
  currentTime = 0;
  pausedTime = 0;
  lapTimes = [];
  isRunning = false;
  startStopButton.textContent = 'Start';
  lapList.innerHTML = '';
  updateDisplay();
  clearInterval(intervalId); // Add this line to clear the interval
});

function updateDisplay() {
  const hours = Math.floor(currentTime / 3600000);
  const minutes = Math.floor((currentTime % 3600000) / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = currentTime % 1000;
  hoursElement.textContent = pad(hours);
  minutesElement.textContent = pad(minutes);
  secondsElement.textContent = pad(seconds);
  millisecondsElement.textContent = pad(milliseconds, 3);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
  return String(number).padStart(length, '0');
}