// js/leer-metalen.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("[DEBUG] DOMContentLoaded fired. Script loaded successfully.");

  // ====== DOM refs ======
  const countdownContainer = document.getElementById("countdownContainer");
  const countdownNumber = document.getElementById("countdownNumber");

  const quizContainer = document.getElementById("quizContainer");
  const questionText = document.getElementById("questionText");
  const timerEl = document.getElementById("timer");

  // Two-button container
  const twoButtonContainer = document.getElementById("twoButtonContainer");
  const btnMetaal = document.getElementById("btnMetaal");
  const btnNietMetaal = document.getElementById("btnNietMetaal");

  // Four-button container
  const fourButtonContainer = document.getElementById("fourButtonContainer");
  const btnEdel = document.getElementById("btnEdel");
  const btnHalfEdel = document.getElementById("btnHalfEdel");
  const btnOnedel = document.getElementById("btnOnedel");
  const btnZeerOnedel = document.getElementById("btnZeerOnedel");

  const feedbackEl = document.getElementById("feedback");

  // Results
  const resultsContainer = document.getElementById("resultsContainer");
  const finalHeading = document.getElementById("finalHeading");
  const finalTimeEl = document.getElementById("finalTime");
  const chartTitleEl = document.getElementById("chartTitle");
  const distChartContainer = document.getElementById("mistakesDistribution");
  const backToMenuBtn = document.getElementById("backToMenuBtn");

  // Player name
  const playerName = localStorage.getItem("playerName") || "Speler";
  console.log("[DEBUG] playerName =", playerName);

  // ====== 2-BUTTON QUESTIONS (metaal vs niet-metaal) ======
  const oldQuestions = [
    // Metalen
    { name: "aluminium", correctAnswer: "metaal", answerType: "2" },
    { name: "barium", correctAnswer: "metaal", answerType: "2" },
    { name: "calcium", correctAnswer: "metaal", answerType: "2" },
    { name: "chroom", correctAnswer: "metaal", answerType: "2" },
    { name: "goud", correctAnswer: "metaal", answerType: "2" },
    { name: "kalium", correctAnswer: "metaal", answerType: "2" },
    { name: "kobalt", correctAnswer: "metaal", answerType: "2" },
    { name: "koper", correctAnswer: "metaal", answerType: "2" },
    { name: "kwik", correctAnswer: "metaal", answerType: "2" },
    { name: "lood", correctAnswer: "metaal", answerType: "2" },
    { name: "magnesium", correctAnswer: "metaal", answerType: "2" },
    { name: "mangaan", correctAnswer: "metaal", answerType: "2" },
    { name: "natrium", correctAnswer: "metaal", answerType: "2" },
    { name: "nikkel", correctAnswer: "metaal", answerType: "2" },
    { name: "platina", correctAnswer: "metaal", answerType: "2" },
    { name: "radium", correctAnswer: "metaal", answerType: "2" },
    { name: "tin", correctAnswer: "metaal", answerType: "2" },
    { name: "titaan", correctAnswer: "metaal", answerType: "2" },
    { name: "uraan", correctAnswer: "metaal", answerType: "2" },
    { name: "wolfraam", correctAnswer: "metaal", answerType: "2" },
    { name: "ijzer", correctAnswer: "metaal", answerType: "2" },
    { name: "zilver", correctAnswer: "metaal", answerType: "2" },
    { name: "zink", correctAnswer: "metaal", answerType: "2" },

    // Niet-metalen
    { name: "argon", correctAnswer: "niet", answerType: "2" },
    { name: "broom", correctAnswer: "niet", answerType: "2" },
    { name: "chloor", correctAnswer: "niet", answerType: "2" },
    { name: "fluor", correctAnswer: "niet", answerType: "2" },
    { name: "fosfor", correctAnswer: "niet", answerType: "2" },
    { name: "helium", correctAnswer: "niet", answerType: "2" },
    { name: "jood", correctAnswer: "niet", answerType: "2" },
    { name: "koolstof", correctAnswer: "niet", answerType: "2" },
    { name: "neon", correctAnswer: "niet", answerType: "2" },
    { name: "silicium", correctAnswer: "niet", answerType: "2" },
    { name: "stikstof", correctAnswer: "niet", answerType: "2" },
    { name: "waterstof", correctAnswer: "niet", answerType: "2" },
    { name: "zuurstof", correctAnswer: "niet", answerType: "2" },
    { name: "zwavel", correctAnswer: "niet", answerType: "2" },
  ];

  // ====== 4-BUTTON QUESTIONS (edel / half edel / onedel / zeer onedel) ======
  const newQuestions = [
    // Edel
    { name: "goud", correctAnswer: "Edel", answerType: "4" },
    { name: "zilver", correctAnswer: "Edel", answerType: "4" },
    { name: "platina", correctAnswer: "Edel", answerType: "4" },

    // Half edel
    { name: "koper", correctAnswer: "Half edel", answerType: "4" },
    { name: "kwik", correctAnswer: "Half edel", answerType: "4" },

    // Onedel
    { name: "ijzer", correctAnswer: "Onedel", answerType: "4" },
    { name: "aluminium", correctAnswer: "Onedel", answerType: "4" },
    { name: "zink", correctAnswer: "Onedel", answerType: "4" },

    // Zeer Onedel
    { name: "kalium", correctAnswer: "Zeer Onedel", answerType: "4" },
    { name: "natrium", correctAnswer: "Zeer Onedel", answerType: "4" },
    { name: "magnesium", correctAnswer: "Zeer Onedel", answerType: "4" },
    { name: "calcium", correctAnswer: "Zeer Onedel", answerType: "4" },
  ];

  // Combine both sets
  const questionQueue = [...oldQuestions, ...newQuestions];
  console.log("[DEBUG] questionQueue length =", questionQueue.length);

  shuffleArray(questionQueue);

  let currentIndex = 0;
  let totalMistakes = 0;
  const mistakesMap = {};

  // Timer
  let startTime = null;
  let timerInterval = null;
  let canClick = false;

  // ===== COUNTDOWN =====
  let countdownValue = 3;
  const countdownInt = setInterval(() => {
    countdownNumber.textContent = countdownValue;
    console.log("[DEBUG] Countdown:", countdownValue);
    countdownValue--;
    if (countdownValue < 0) {
      clearInterval(countdownInt);
      startGame();
    }
  }, 1000);

  function startGame() {
    console.log("[DEBUG] startGame() fired.");
    countdownContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);

    showQuestion();
  }

  function updateTimer() {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000);
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${mm}:${ss}`;
  }

  function showQuestion() {
    console.log("[DEBUG] showQuestion() currentIndex =", currentIndex);
    if (currentIndex >= questionQueue.length) {
      console.log("[DEBUG] No more questions, endGame()");
      endGame();
      return;
    }

    // Hide feedback from previous question
    feedbackEl.classList.add("hidden");
    feedbackEl.textContent = "";

    // Force both containers hidden first
    twoButtonContainer.classList.add("hidden");
    fourButtonContainer.classList.add("hidden");

    const currentQ = questionQueue[currentIndex];
    console.log("[DEBUG] current question:", currentQ.name, "| answerType =", currentQ.answerType);

    questionText.textContent = currentQ.name;

    if (currentQ.answerType === "2") {
      console.log("[DEBUG] --> Showing TWO-BUTTON container (metaal/niet-metaal).");
      twoButtonContainer.classList.remove("hidden");
    } else {
      // "4"
      console.log("[DEBUG] --> Showing FOUR-BUTTON container (edel/half edel/...).");
      fourButtonContainer.classList.remove("hidden");
    }

    canClick = true;
  }

  // ============= Button Handlers =============
  // 2-button
  btnMetaal.addEventListener("click", () => checkAnswer("metaal"));
  btnNietMetaal.addEventListener("click", () => checkAnswer("niet"));

  // 4-button
  btnEdel.addEventListener("click", () => checkAnswer("Edel"));
  btnHalfEdel.addEventListener("click", () => checkAnswer("Half edel"));
  btnOnedel.addEventListener("click", () => checkAnswer("Onedel"));
  btnZeerOnedel.addEventListener("click", () => checkAnswer("Zeer Onedel"));

  function checkAnswer(userChoice) {
    if (!canClick || currentIndex >= questionQueue.length) return;
    canClick = false;

    const currentQ = questionQueue[currentIndex];
    const metalName = currentQ.name;

    console.log("[DEBUG] checkAnswer() => userChoice:", userChoice, "| correctAnswer:", currentQ.correctAnswer);

    if (userChoice === currentQ.correctAnswer) {
      feedbackEl.textContent = "Correct!";
      feedbackEl.classList.remove("hidden", "wrong");
      feedbackEl.classList.add("correct");
      console.log("[DEBUG] CORRECT. Next question soon...");

      setTimeout(() => {
        feedbackEl.classList.add("hidden");
        feedbackEl.classList.remove("correct");

        currentIndex++;
        showQuestion();
      }, 700);
    } else {
      // wrong
      totalMistakes++;
      mistakesMap[metalName] = (mistakesMap[metalName] || 0) + 1;

      feedbackEl.textContent = `Fout! ${metalName} is: ${currentQ.correctAnswer}`;
      feedbackEl.classList.remove("hidden", "correct");
      feedbackEl.classList.add("wrong");
      console.log("[DEBUG] WRONG. totalMistakes =", totalMistakes, "| question reinserted + clone at end.");

      // Remove from queue
      const [removedQ] = questionQueue.splice(currentIndex, 1);

      // Reinsert it 3 places later
      const newPos = Math.min(currentIndex + 3, questionQueue.length);
      questionQueue.splice(newPos, 0, removedQ);

      // Also push a clone to the end
      questionQueue.push({ ...removedQ });

      setTimeout(() => {
        feedbackEl.classList.add("hidden");
        feedbackEl.classList.remove("wrong");
        showQuestion();
      }, 3000);
    }
  }

  // ============= END GAME =============
  function endGame() {
    clearInterval(timerInterval);
    quizContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");

    finalHeading.textContent = `Goed gedaan, ${playerName}!`;
    finalTimeEl.textContent = `Tijd: ${timerEl.textContent}`;

    // Fill in 0 mistakes for any not in mistakesMap
    questionQueue.forEach(q => {
      if (mistakesMap[q.name] === undefined) {
        mistakesMap[q.name] = 0;
      }
    });

    // Build distribution
    const distribution = {};
    Object.values(mistakesMap).forEach(m => {
      distribution[m] = (distribution[m] || 0) + 1;
    });
    const allMistakes = Object.keys(distribution)
      .map(k => parseInt(k, 10))
      .sort((a, b) => a - b);

    chartTitleEl.textContent = `Aantal fouten: ${totalMistakes}`;
    distChartContainer.innerHTML = "";

    const maxCount = Math.max(...Object.values(distribution));
    const maxBarHeight = 100;

    allMistakes.forEach(mCount => {
      const howMany = distribution[mCount];
      const colDiv = document.createElement("div");
      colDiv.classList.add("dist-column");

      const bar = document.createElement("div");
      bar.classList.add("dist-bar");
      const barPx = (howMany / maxCount) * maxBarHeight;
      bar.style.height = `${barPx}px`;
      bar.textContent = howMany;

      const label = document.createElement("div");
      label.classList.add("dist-label");
      label.textContent = mCount;

      colDiv.appendChild(bar);
      colDiv.appendChild(label);
      distChartContainer.appendChild(colDiv);
    });
  }

  backToMenuBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Utility
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
});
