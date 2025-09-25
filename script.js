const questions = [
  {
    question: "What is the name of the tallest mountain in the world?",
    answers: ["Mount Everest", "K2", "Kilimanjaro", "Mount Fuji"],
    correct: "Mount Everest"
  },
  {
    question: "What are the names of the seven continents of the world?",
    answers: ["Asia, Africa, North America, South America, Antarctica, Europe and Australia",
              "Asia, Africa, Oceania, Greenland, Europe, America, Antarctica",
              "Asia, Africa, North America, South America, Antarctica, Europe and Greenland",
              "Asia, Africa, Australia, North America, South America, Antarctica, India"],
    correct: "Asia, Africa, North America, South America, Antarctica, Europe and Australia"
  },
  {
    question: "Which country has the largest population in the world?",
    answers: ["India", "China", "USA", "Russia"],
    correct: "China"
  },
  {
    question: "What is the capital of Mexico?",
    answers: ["Monterrey", "Cancún", "Mexico City", "Guadalajara"],
    correct: "Mexico City"
  },
  {
    question: "What is the smallest country in the world?",
    answers: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correct: "Vatican City"
  },
  {
    question: "Which river flows through the Brazilian rainforest?",
    answers: ["Amazon", "Nile", "Congo", "Yangtze"],
    correct: "Amazon"
  },
  {
    question: "Which one is colder?",
    answers: ["North Pole", "South Pole"],
    correct: "South Pole"
  },
  {
    question: "What is the capital of Spain?",
    answers: ["Barcelona", "Madrid", "Seville", "Valencia"],
    correct: "Madrid"
  },
  {
    question: "Who is the Leader of Myanmar?",
    answers: ["Aung San Suu Kyi", "Ne Win", "Min Aung Hlaing", "Than Shwe"],
    correct: "Aung San Suu Kyi"
  },
  {
    question: "Which country has the most natural lakes?",
    answers: ["Canada", "USA", "Russia", "Finland"],
    correct: "Canada"
  }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const resultEl = document.getElementById("result");
const questionNumberEl = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultEl.textContent = "";
  restartBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionEl.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.correct));
    answersEl.appendChild(button);
  });
}

function resetState() {
  answersEl.innerHTML = "";
}

function selectAnswer(button, correctAnswer) {
  const isCorrect = button.textContent === correctAnswer;
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  // disable other buttons
  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionNumberEl.textContent = "";
  questionEl.textContent = `🎉 You finished the quiz!`;
  resultEl.textContent = `Your score: ${score} / ${questions.length}`;
  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", startQuiz);

// Start the game on page load
startQuiz();
