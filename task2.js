// Variables for tracking time and stopwatch state
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Format time as mm:ss:SS (minutes:seconds:milliseconds)
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

// Pad numbers to always display two digits
function pad(num) {
    return num < 10 ? '0' + num : num;
}

// Update the display every 10ms
function updateDisplay() {
    elapsedTime = new Date().getTime() - startTime + elapsedTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
function startStopwatch() {
    startTime = new Date().getTime() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

// Pause the stopwatch
function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapTimes = [];
    lapList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

// Record a lap time
function recordLap() {
    const lapTime = formatTime(elapsedTime);
    lapTimes.push(lapTime);
    
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
