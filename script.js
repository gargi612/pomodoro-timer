
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const focusInput = document.getElementById("focusInput");
const breakInput = document.getElementById("breakInput");
const applyBtn = document.getElementById("applyBtn");

const modeButtons = document.querySelectorAll(".mode");
let focusMinutes = Number(focusInput.value) || 25;
let breakMinutes = Number(breakInput.value) || 5;
let timeLeft = focusMinutes * 60;
let timer = null;
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}


function startTimer() {
  if (timer !== null) return;

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      return;
    }
    timeLeft--;
    updateTimer();
  }, 1000);
}
function pauseTimer() {
  clearInterval(timer);
  timer = null;
}
function resetTimer() {
  clearInterval(timer);
  timer = null;
  timeLeft = focusMinutes * 60;
  updateTimer();
}
applyBtn.addEventListener("click", () => {
  focusMinutes = Number(focusInput.value) || 25;
  breakMinutes = Number(breakInput.value) || 5;

  clearInterval(timer);
  timer = null;

  timeLeft = focusMinutes * 60;
  updateTimer();
});
modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    modeButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    clearInterval(timer);
    timer = null;

    const minutes = Number(button.dataset.time);
    timeLeft = minutes * 60;
    updateTimer();
  });
});
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
updateTimer();
