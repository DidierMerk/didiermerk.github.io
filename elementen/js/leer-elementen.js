// js/leer-elementen.js
document.addEventListener("DOMContentLoaded", () => {
    // Refs
    const countdownContainer = document.getElementById("countdownContainer");
    const countdownNumber = document.getElementById("countdownNumber");
  
    const quizContainer = document.getElementById("quizContainer");
    const questionText = document.getElementById("questionText");
    const answerInput = document.getElementById("answerInput");
    const submitAnswerBtn = document.getElementById("submitAnswerBtn");
    const feedbackEl = document.getElementById("feedback");
    const timerEl = document.getElementById("timer");
  
    const resultsContainer = document.getElementById("resultsContainer");
    const finalHeading = document.getElementById("finalHeading");
    const finalTimeEl = document.getElementById("finalTime");
    const backToMenuBtn = document.getElementById("backToMenuBtn");
    const distChartContainer = document.getElementById("mistakesDistribution");
    const chartTitleEl = document.getElementById("chartTitle");
  
    // Retrieve player's name from localStorage (or fallback)
    const playerName = localStorage.getItem("playerName") || "Speler";
  
    // Elements data (Dutch name + symbol)
    const elementsData = [
      { name: "waterstof", symbol: "H" },
      { name: "helium", symbol: "He" },
      { name: "koolstof", symbol: "C" },
      { name: "zuurstof", symbol: "O" },
      { name: "natrium", symbol: "Na" },
    ];
  
    // Build questionQueue
    let questionQueue = [];
    for (const el of elementsData) {
      questionQueue.push({
        question: el.name,
        answer: el.symbol
      });
      questionQueue.push({
        question: el.symbol,
        answer: el.name
      });
    }
    shuffleArray(questionQueue);
  
    // We'll track total mistakes overall
    let totalMistakes = 0;
    // We'll track mistakes per unique question text
    const questionMistakesMap = {};  // e.g. { "zuurstof": 2, "O": 1, ... }
  
    // Current index in the queue
    let currentIndex = 0;
    // Timer
    let startTime = null;
    let timerInterval = null;
  
    // Countdown
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
      // Hide countdown, show quiz
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
      if (currentIndex >= questionQueue.length) {
        endGame();
        return;
      }
      // Hide old feedback
      feedbackEl.classList.add("hidden");
      feedbackEl.textContent = "";
  
      const currentQ = questionQueue[currentIndex];
      questionText.textContent = currentQ.question;
  
      answerInput.value = "";
      answerInput.focus();
    }
  
    // Prevent non-letter input
    answerInput.addEventListener("input", (e) => {
      const val = e.target.value;
      if (/[^A-Za-z]/.test(val)) {
        e.target.value = val.replace(/[^A-Za-z]/g, "");
      }
    });
  
    // Submit
    answerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkAnswer();
    });
    submitAnswerBtn.addEventListener("click", checkAnswer);
  
    function checkAnswer() {
      if (currentIndex >= questionQueue.length) return;
  
      const userAnswer = answerInput.value.trim();
      const currentQ = questionQueue[currentIndex];
      const questionTextKey = currentQ.question; // for questionMistakesMap
  
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
  
        // increment the specific question's mistake count
        questionMistakesMap[questionTextKey] = (questionMistakesMap[questionTextKey] || 0) + 1;
  
        feedbackEl.textContent = `Fout! Juiste antwoord: ${currentQ.answer}`;
        feedbackEl.classList.remove("hidden", "correct");
        feedbackEl.classList.add("wrong");
  
        // Remove from queue
        const [removedQ] = questionQueue.splice(currentIndex, 1);
  
        // 1) Reinsert 3 places later
        const newPos = Math.min(currentIndex + 3, questionQueue.length);
        questionQueue.splice(newPos, 0, removedQ);
  
        // 2) Also push a duplicate to the end
        const endClone = { ...removedQ };
        questionQueue.push(endClone);
  
        // Lock input for 3s
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
      // Stop timer
      clearInterval(timerInterval);
  
      // Hide quiz, show results
      quizContainer.classList.add("hidden");
      resultsContainer.classList.remove("hidden");
  
      finalHeading.textContent = `Goed gedaan, ${playerName}!`;
      finalTimeEl.textContent = `Tijd: ${timerEl.textContent}`;
  
      // Now we build a distribution from questionMistakesMap
      // e.g. if questionMistakesMap = { "zuurstof": 2, "helium": 0, "O": 1 }
      // We want: {0: 1 question, 1: 1 question, 2: 1 question}
      const distribution = {};
      Object.values(questionMistakesMap).forEach(m => {
        distribution[m] = (distribution[m] || 0) + 1;
      });
  
      // Also note some questions might never appear in questionMistakesMap => means 0 mistakes
      // If you want to count those as well, you can fill them in from questionQueue’s unique texts:
      const uniqueTexts = new Set(questionQueue.map(q => q.question));
      // For each unique question text, if not in questionMistakesMap => that question had 0 mistakes
      uniqueTexts.forEach(txt => {
        if (!(txt in questionMistakesMap)) {
          distribution[0] = (distribution[0] || 0) + 1;
        }
      });
  
      // Now sort keys
      const allMistakes = Object.keys(distribution)
        .map(k => parseInt(k, 10))
        .sort((a, b) => a - b);
  
      // max count for scaling
      const maxCount = Math.max(...Object.values(distribution));
  
      // Set chart title
      chartTitleEl.textContent = `Aantal fouten: ${totalMistakes}`;
  
      // Build bars
      distChartContainer.innerHTML = "";
      const maxBarHeight = 100;
  
      allMistakes.forEach(mistakeCount => {
        const countOfQuestions = distribution[mistakeCount];
  
        const colDiv = document.createElement("div");
        colDiv.classList.add("dist-column");
  
        const bar = document.createElement("div");
        bar.classList.add("dist-bar");
  
        const barPx = (countOfQuestions / maxCount) * maxBarHeight;
        bar.style.height = `${barPx}px`;
        bar.textContent = countOfQuestions;  // show how many questions had that mistakeCount
  
        const label = document.createElement("div");
        label.classList.add("dist-label");
        label.textContent = mistakeCount;
  
        colDiv.appendChild(bar);
        colDiv.appendChild(label);
        distChartContainer.appendChild(colDiv);
      });
    }
  
    // Return to menu
    backToMenuBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  
    // Utility shuffle
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  });
  