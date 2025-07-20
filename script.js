const quizData = [
  {
    question: "What does 'AI' stand for?",
    options: ["Automatic Internet", "Artificial Intelligence", "Advanced Input", "Audio Interface"],
    correct: 1
  },
  {
    question: "Which company makes the iPhone?",
    options: ["Samsung", "Microsoft", "Apple", "Google"],
    correct: 2
  },
  {
    question: "What is the full form of 'Wi-Fi'?",
    options: ["Wireless Finder", "Wireless Fidelity", "Wide Field Internet", "Web Frequency"],
    correct: 1
  },
  {
    question: "Which app is used for video meetings?",
    options: ["Zoom", "Spotify", "Telegram", "Snapchat"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timer;
let timeLeft = 10;

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").textContent = `⏱️ ${timeLeft}s - ${q.question}`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.textContent = opt;
    div.className = "option";
    div.onclick = () => selectOption(div, index);
    optionsDiv.appendChild(div);
  });

  document.getElementById("result").textContent = "";
  startTimer();
}

function startTimer() {
  timeLeft = 10;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("question").textContent = `⏱️ ${timeLeft}s - ${quizData[currentQuestion].question}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showCorrectOnly();
    }
  }, 1000);
}

function selectOption(element, index) {
  clearInterval(timer);
  selectedOption = index;

  const options = document.querySelectorAll(".option");
  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";
    if (i === quizData[currentQuestion].correct) {
      opt.classList.add("correct");
    } else if (i === index) {
      opt.classList.add("wrong");
    }
  });

  if (index === quizData[currentQuestion].correct) {
    score++;
    document.getElementById("result").textContent = "✅ Correct!";
  } else {
    document.getElementById("result").textContent =
      `❌ Wrong! Correct: ${quizData[currentQuestion].options[quizData[currentQuestion].correct]}`;
  }

  setTimeout(nextQuestion, 2000);
}

function showCorrectOnly() {
  const options = document.querySelectorAll(".option");
  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";
    if (i === quizData[currentQuestion].correct) {
      opt.classList.add("correct");
    }
  });

  document.getElementById("result").textContent =
    `⏰ Time's up! Correct: ${quizData[currentQuestion].options[quizData[currentQuestion].correct]}`;
  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  clearInterval(timer);
  selectedOption = null;
  currentQuestion++;
  timeLeft = 10;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  document.getElementById("quiz").style.display = "none";

  let message = "";
  if (score === quizData.length) {
    message = "🏆 Excellent! You're a tech wizard!";
  } else if (score >= quizData.length / 2) {
    message = "👍 Good job! But you can do better!";
  } else {
    message = "😅 Keep practicing! You'll improve!";
  }

  let resultHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>
    <p>${message}</p>
    <h3>✅ Correct Answers:</h3>
    <ul>
      ${quizData.map((q, i) => `<li><strong>Q${i + 1}:</strong> ${q.question}<br><em>✔ ${q.options[q.correct]}</em></li>`).join("")}
    </ul>
    <button onclick="restartQuiz()">🔁 Try Again</button>
  `;

  document.getElementById("result").innerHTML = resultHTML;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 10;
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

loadQuestion();
