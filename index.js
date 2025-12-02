const quizData = [
  {
    question: " What does DOM stand for ?",
    Option: [
      "Document Order Model",
      "Document Object Model",
      "Desktop Object Model",
      "Digital Object Management",
    ],
    correctAnswer: 1,
  },
  {
    question: " Which method selects by ID ?",
    Option: [
      "getElementById()",
      "querySelectorAll()",
      "getElement()",
      "getElementsByClassName()",
    ],
    correctAnswer: 0,
  },
  {
    question: " Which property is used to change the text of an HTML element ?",
    Option: ["innerText", "textContent", "innerHTML", "All of the above"],
    correctAnswer: 3,
  },
  {
    question: "Wich event is fires on input change ?",
    Option: ["click", "submit", "change", "keydown"],
    correctAnswer: 2,
  },
];

let questions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(countdown, 1000);
  const q = questions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  q.Option.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, true));
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

function countdown() {
  timeLeft--;
  updateTimer();

  if (timeLeft === 0) {
    clearInterval(timer);
    selectAnswer(questions[currentQuestion]?.correctAnswer, false);
  }
}

function updateTimer() {
  timerEl.textContent = `⏱️ ${timeLeft}s`;
}

function selectAnswer(index, shouldScore) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn) => (btn.disabled = true));
  if (index === q.correctAnswer) {
    shouldScore && score++;
    buttons[index].classList.add("correct");
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.correctAnswer].classList.add("correct");
  }
  nextBtn.style.display = "inline-block";
}
nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});
function showResult() {
  const highScore = localStorage.getItem("qiuzHighScore") || 0;
  const isNew = score > highScore;

  if (isNew) {
    localStorage.setItem("qiuzHighScore", score);
  }

  resultEl.innerHTML = `<h2> Boommm !!! Quiz Completed </h2>
  <p>Your Score: ${score} / ${questions.length} </p>
  <p>High Score: ${isNew ? score : highScore} </p>
  <button class="restart-btn" onclick="location.reload()">Restart Quiz</button>

  `;
  resultEl.style.display = "block";
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
}
loadQuestion();
