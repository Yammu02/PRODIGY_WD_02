let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', addLap);

function start() {
    if (!running) {
        startTime = Date.now() - difference;
        timerInterval = setInterval(updateDisplay, 1000);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    startTime = 0;
    difference = 0;
    updatedTime = 0;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = "";
    laps = [];
}

function addLap() {
    if (running) {
        const lapTime = formatTime(updatedTime);
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}
