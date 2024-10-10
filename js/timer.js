let timer;
let timeLeft;
let isRunning = false;
let cycleCount = 0;
function setTimer(minutes) {
    if (!isRunning) {
        timeLeft = minutes * 60;
        if (minutes === 25) {
            cycleCount++;
        }
        updateDisplay();
    }
}
function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('start-pause-button').innerText = 'Start';
    } else {
        timer = setInterval(countdown, 1000);
        document.getElementById('start-pause-button').innerText = 'Pause';
    }
    isRunning = !isRunning;
}
function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('start-pause-button').innerText = 'Start';
        cycleCount++;
        if (cycleCount % 8 === 0) {
            setTimer(45);
        } else if (cycleCount % 2 === 0) {
            setTimer(5);
        } else {
            setTimer(25);
        }
        startPauseTimer();
    } else {
        timeLeft--;
        updateDisplay();
    }
}
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('timer-display').innerText = formattedTime;
    document.getElementById('timer-count').innerText = cycleCount;
    document.title = `Timer - ${formattedTime}`;
}
// Initial Timer Setting
setTimer(25);