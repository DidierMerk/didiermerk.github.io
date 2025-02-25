// js/leer-atomen.js
document.addEventListener("DOMContentLoaded", () => {
  // DOM Refs
  const countdownContainer = document.getElementById("countdownContainer");
  const countdownNumber = document.getElementById("countdownNumber");

  const quizContainer = document.getElementById("quizContainer");
  const questionText = document.getElementById("questionText");
  const questionImage = document.getElementById("questionImage");
  const answerInput = document.getElementById("answerInput");
  const submitAnswerBtn = document.getElementById("submitAnswerBtn");
  const feedbackEl = document.getElementById("feedback");
  const timerEl = document.getElementById("timer");

  const resultsContainer = document.getElementById("resultsContainer");
  const finalHeading = document.getElementById("finalHeading");
  const finalTimeEl = document.getElementById("finalTime");
  const chartTitleEl = document.getElementById("chartTitle");
  const distChartContainer = document.getElementById("mistakesDistribution");
  const backToMenuBtn = document.getElementById("backToMenuBtn");

  // Retrieve player's name
  const playerName = localStorage.getItem("playerName") || "Speler";

  // ===== Questions Array =====
  const questions = [];

  // 1) Two-atomige elementen (single question)
  questions.push({
    question: "Noem alle twee-atomige elementen",
    answer: "waterstof, stikstof, zuurstof, fluor, chloor, broom, jood",
    img: null
  });

  // 2) Hoeveel kg is 1,00U?
  questions.push({
    question: "Hoeveel kg is 1,00U?",
    answer: "1,66*10^-27",
    img: null
  });

  // 3) Atoommassa's
  // waterstof=1,0U; koolstof=12,0U; stikstof=14,0U; zuurstof=16,0U; fosfor=31,0U; zwavel=32,1U; chloor=35,5U
  const atomMassData = [
    { name: "waterstof", mass: "1,0U" },
    { name: "koolstof",  mass: "12,0U" },
    { name: "stikstof",  mass: "14,0U" },
    { name: "zuurstof",  mass: "16,0U" },
    { name: "fosfor",    mass: "31,0U" },
    { name: "zwavel",    mass: "32,1U" },
    { name: "chloor",    mass: "35,5U" }
  ];
  atomMassData.forEach(item => {
    questions.push({
      question: `Wat is de atoommassa van ${item.name}?`,
      answer: item.mass,
      img: null
    });
  });

  // 4) Pictures from /assets/groepen/
  const groepenImages = [
    { file: "aardalkalimetalen.png", answer: "aardalkalimetalen" },
    { file: "alkalimetalen.png",     answer: "alkalimetalen" },
    { file: "halogenen.png",         answer: "halogenen" },
    { file: "edelgassen.png",        answer: "edelgassen" },
    { file: "metalen.png",           answer: "metalen" },
    { file: "metalloiden.png",       answer: "metalloiden" },
    { file: "nietmetalen.png",       answer: "niet-metalen" }
  ];
  groepenImages.forEach(item => {
    questions.push({
      question: "", // no text, just the image
      answer: item.answer,
      img: `assets/groepen/${item.file}`
    });
  });

  // 5) Pictures from /assets/atoomsoorten/
  const atoomsoortenImages = [
    { file: "chloor.png",    answer: "chloor" },
    { file: "fosfor.png",    answer: "fosfor" },
    { file: "koolstof.png",  answer: "koolstof" },
    { file: "stikstof.png",  answer: "stikstof" },
    { file: "waterstof.png", answer: "waterstof" },
    { file: "zuurstof.png",  answer: "zuurstof" },
    { file: "zwavel.png",    answer: "zwavel" }
  ];
  atoomsoortenImages.forEach(item => {
    questions.push({
      question: "Welke atoomsoort is dit?",
      answer: item.answer,
      img: `assets/atoomsoorten/${item.file}`
    });
  });

  // ===== NEW SET #1: Pictures from /assets/formules/ =====
  // e.g. fosforzuur.png => "H3PO4, Fosforzuur"
  const formulesImages = [
    { file: "fosforzuur.png",      answer: "H3PO4, Fosforzuur" },
    { file: "ammoniak.png",        answer: "NH3, Ammoniak" },
    { file: "ethanol.png",         answer: "C2H6O, Ethanol (Alcohol)" },
    { file: "glucose.png",         answer: "C6H12O6, Glucose" },
    { file: "methaan.png",         answer: "CH4, Methaan" },
    { file: "koolstofdioxide.png", answer: "CO2, Koolstofdioxide" },
    { file: "zwaveldioxide.png",   answer: "SO2, Zwaveldioxide" },
    { file: "zwavelzuur.png",      answer: "H2SO4, Zwavelzuur" }
  ];
  formulesImages.forEach(item => {
    questions.push({
      question: "Welke verbinding is dit?",
      answer: item.answer,
      img: `assets/formules/${item.file}`
    });
  });

  // ===== NEW SET #2: Molecule name → formula
  // "Wat is de molecuulformule van X?"
  const moleculenData = [
    { name: "fosforzuur",      formula: "H3PO4" },
    { name: "ammoniak",        formula: "NH3" },
    { name: "ethanol",         formula: "C2H6O" },
    { name: "glucose",         formula: "C6H12O6" },
    { name: "methaan",         formula: "CH4" },
    { name: "koolstofdioxide", formula: "CO2" },
    { name: "zwaveldioxide",   formula: "SO2" },
    { name: "zwavelzuur",      formula: "H2SO4" }
  ];
  moleculenData.forEach(item => {
    questions.push({
      question: `Wat is de molecuulformule van ${item.name}?`,
      answer: item.formula,
      img: null
    });
  });

  // Finally, shuffle all questions
  shuffleArray(questions);

  // Quiz state
  let currentIndex = 0;
  let totalMistakes = 0;
  const questionMistakesMap = {};
  let startTime = null;
  let timerInterval = null;

  // ===== COUNTDOWN =====
  let countdownValue = 3;
  const countdownInterval = setInterval(() => {
    countdownNumber.textContent = countdownValue;
    countdownValue--;
    if (countdownValue < 0) {
      clearInterval(countdownInterval);
      startGame();
    }
  }, 1000);

  function startGame() {
    countdownContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    // Start timer
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
    if (currentIndex >= questions.length) {
      endGame();
      return;
    }
    // Hide feedback
    feedbackEl.classList.add("hidden");
    feedbackEl.textContent = "";

    const currentQ = questions[currentIndex];

    // Show question text (or empty string if none)
    questionText.textContent = currentQ.question || "";

    // Show or hide image
    if (currentQ.img) {
      questionImage.src = currentQ.img;
      questionImage.classList.remove("hidden");
    } else {
      questionImage.src = "";
      questionImage.classList.add("hidden");
    }

    // Reset input
    answerInput.value = "";
    answerInput.focus();
  }

  // We allow any typed characters (no filtering)
  // Submit handlers
  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });
  submitAnswerBtn.addEventListener("click", checkAnswer);

  function checkAnswer() {
    if (currentIndex >= questions.length) return;

    const userAnswer = answerInput.value.trim();
    const currentQ = questions[currentIndex];
    // We'll use question or image path as the "key" in the mistakes map
    const questionKey = currentQ.question || currentQ.img || "(unknown)";

    if (userAnswer === currentQ.answer) {
      // Correct
      feedbackEl.textContent = "Correct!";
      feedbackEl.classList.remove("hidden", "wrong");
      feedbackEl.classList.add("correct");

      setTimeout(() => {
        feedbackEl.classList.add("hidden");
        feedbackEl.classList.remove("correct");

        currentIndex++;
        showQuestion();
      }, 700);
    } else {
      // Wrong
      totalMistakes++;
      questionMistakesMap[questionKey] = (questionMistakesMap[questionKey] || 0) + 1;

      feedbackEl.textContent = `Fout! Antwoord is: ${currentQ.answer}`;
      feedbackEl.classList.remove("hidden", "correct");
      feedbackEl.classList.add("wrong");

      // Remove from array, reinsert further, plus clone at end
      const [removedQ] = questions.splice(currentIndex, 1);
      const newPos = Math.min(currentIndex + 3, questions.length);
      questions.splice(newPos, 0, removedQ);
      questions.push({ ...removedQ });

      answerInput.disabled = true;
      submitAnswerBtn.disabled = true;

      setTimeout(() => {
        feedbackEl.classList.add("hidden");
        feedbackEl.classList.remove("wrong");

        answerInput.disabled = false;
        submitAnswerBtn.disabled = false;
        showQuestion();
      }, 3000);
    }
  }

  function endGame() {
    clearInterval(timerInterval);

    quizContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");

    finalHeading.textContent = `Goed gedaan, ${playerName}!`;
    finalTimeEl.textContent = `Tijd: ${timerEl.textContent}`;

    // Build distribution from questionMistakesMap
    const distribution = {};
    Object.values(questionMistakesMap).forEach(m => {
      distribution[m] = (distribution[m] || 0) + 1;
    });

    const mistakeKeys = Object.keys(distribution)
      .map(k => parseInt(k, 10))
      .sort((a, b) => a - b);

    chartTitleEl.textContent = `Aantal fouten: ${totalMistakes}`;
    distChartContainer.innerHTML = "";

    if (mistakeKeys.length === 0) {
      // Means no mistakes
      const colDiv = document.createElement("div");
      colDiv.classList.add("dist-column");
      colDiv.innerHTML = `
        <div class="dist-bar" style="height: 100px;">0</div>
        <div class="dist-label">fouten</div>
      `;
      distChartContainer.appendChild(colDiv);
      return;
    }

    const maxCount = Math.max(...Object.values(distribution));
    const maxBarHeight = 100;

    mistakeKeys.forEach(mCount => {
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

  // Return to menu
  backToMenuBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Utility: shuffle array in-place
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
});
