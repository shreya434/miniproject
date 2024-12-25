let timer;
let isTimerRunning = false;
let timerDuration = 25 * 60; // Default work duration (25 minutes)
let breakDuration = 5 * 60; // Default break duration (5 minutes)
let remainingTime = timerDuration;
let isOnBreak = false;
let pomodoroCount = 1;
let musicElement = document.getElementById("music");

// Timer elements
const timerDisplay = document.getElementById("timerDisplay");
const feedbackText = document.getElementById("feedbackText");
const sessionType = document.getElementById("sessionType");
const sessionCount = document.getElementById("sessionCount");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// Duration selection elements
const workDurationSelect = document.getElementById("workDuration");
const breakDurationSelect = document.getElementById("breakDuration");
const backgroundSelect = document.getElementById("backgroundSelect");
const musicSelect = document.getElementById("musicSelect");

// Update timer duration based on user input
workDurationSelect.addEventListener("change", () => {
    timerDuration = parseInt(workDurationSelect.value) * 60;
    remainingTime = timerDuration;
    updateTimerDisplay();
});

breakDurationSelect.addEventListener("change", () => {
    breakDuration = parseInt(breakDurationSelect.value) * 60;
});

// Background change
backgroundSelect.addEventListener("change", (event) => {
    document.body.className = event.target.value;
});

// Play selected music
musicSelect.addEventListener("change", (event) => {
    if (event.target.value === "none") {
        musicElement.pause();
        console.log("Music stopped");
    } else {
        const musicSrc = event.target.value === "relaxing" ? "relaxing-music.mp3" : "focus-music.mp3";
        musicElement.src = musicSrc;
        musicElement.play()
            .then(() => {
                console.log("Music is playing: " + musicSrc);
            })
            .catch((error) => {
                console.error("Error playing music:", error);
            });
    }
});

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Start the timer
function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    startBtn.disabled = true;
    feedbackText.style.display = "none";
    feedbackText.textContent = "TIMER STARTED!";
    feedbackText.style.display = "block";
    setTimeout(() => feedbackText.style.display = "none", 1800);

    timer = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();

        if (remainingTime <= 0) {
            clearInterval(timer);
            if (isOnBreak) {
                pomodoroCount++;
                sessionCount.textContent = `Pomodoro #${pomodoroCount}`;
                sessionType.textContent = "Work";
                remainingTime = timerDuration;
                isOnBreak = false;
            } else {
                sessionType.textContent = "Break";
                remainingTime = breakDuration;
                isOnBreak = true;
            }
            startTimer();
        }
    }, 1000);
}

// Stop the timer
function stopTimer() {
    if (!isTimerRunning) return;
    clearInterval(timer);
    musicElement.pause();
    isTimerRunning = false;
    startBtn.disabled = false;
    feedbackText.style.display = "none";
    feedbackText.textContent = "TIMER STOPPED!";
    feedbackText.style.display = "block";
    setTimeout(() => feedbackText.style.display = "none", 1500);
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    startBtn.disabled = false;
    remainingTime = timerDuration;
    updateTimerDisplay();
    sessionType.textContent = "Work";
    sessionCount.textContent = `Pomodoro #${pomodoroCount}`;
    feedbackText.style.display = "none";
}

// Event listeners for buttons
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();
