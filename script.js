const sampleText = document.getElementById("sample-text");
const userInput = document.getElementById("user-input");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const timerDisplay = document.getElementById("timer");
const charCountDisplay = document.getElementById("char-count");

let timer;
let startTime;
let charCount = 0;
let isTimerRunning = false;

function updateCharCount() {
    charCount = userInput.value.length;
    charCountDisplay.textContent = charCount;
}

function startTimer() {
    if (!isTimerRunning) {
        startTime = Date.now();
        timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timerDisplay.textContent = `${elapsedTime}s`;
        }, 1000);
        isTimerRunning = true;
    }
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timerDisplay.textContent = "0s";
    isTimerRunning = false;
}

startBtn.addEventListener("click", () => {
    startTimer();
    userInput.focus();
});

pauseBtn.addEventListener("click", () => {
    stopTimer();
});

resetBtn.addEventListener("click", () => {
    resetTimer();
    charCount = 0;
    charCountDisplay.textContent = charCount;
    userInput.value = "";
});

userInput.addEventListener("input", updateCharCount);
