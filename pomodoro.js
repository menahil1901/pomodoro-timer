// Timer settings
const workTime = 25 * 60; // 25 minutes in seconds
const breakTime = 5 * 60; // 5 minutes in seconds

let timer;
let timeRemaining = workTime;
let isWorkTime = true; // true = Work, false = Break
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

// Update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerDisplay.className = isWorkTime ? 'work' : 'break'; // Change color based on work/break
}

// Start or resume the timer
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;

    timer = setInterval(() => {
        timeRemaining--;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            isRunning = false;
            // Switch to break or work session
            if (isWorkTime) {
                timeRemaining = breakTime;
                isWorkTime = false;
            } else {
                timeRemaining = workTime;
                isWorkTime = true;
            }
            startTimer(); // Start the next session
        }

        updateTimerDisplay();
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = workTime;
    isWorkTime = true;
    updateTimerDisplay();
    startButton.disabled = false;
    stopButton.disabled = true;
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
updateTimerDisplay();