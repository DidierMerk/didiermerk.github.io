// js/leer-metalen.js
document.addEventListener("DOMContentLoaded", () => {
    // Refs
    const countdownContainer = document.getElementById("countdownContainer");
    const countdownNumber = document.getElementById("countdownNumber");
  
    const quizContainer = document.getElementById("quizContainer");
    const questionText = document.getElementById("questionText");
    const timerEl = document.getElementById("timer");
  
    const btnMetaal = document.getElementById("btnMetaal");
    const btnNietMetaal = document.getElementById("btnNietMetaal");
    const feedbackEl = document.getElementById("feedback");
  
    // Results
    const resultsContainer = document.getElementById("resultsContainer");
    const finalHeading = document.getElementById("finalHeading");
    const finalTimeEl = document.getElementById("finalTime");
    const chartTitleEl = document.getElementById("chartTitle");
    const distChartContainer = document.getElementById("mistakesDistribution");
    const backToMenuBtn = document.getElementById("backToMenuBtn");
  
    // Retrieve user's name
    const playerName = localStorage.getItem("playerName") || "Speler";
  
    // Data: each with name + type: "metaal" or "niet"
    const metalsData = [
      // -- Metalen --
      { name: "aluminium", type: "metaal" },
      { name: "barium", type: "metaal" },
      { name: "calcium", type: "metaal" },
      { name: "chroom", type: "metaal" },
      { name: "goud", type: "metaal" },
      { name: "kalium", type: "metaal" },
      { name: "kobalt", type: "metaal" },
      { name: "koper", type: "metaal" },
      { name: "kwik", type: "metaal" },
      { name: "lood", type: "metaal" },
      { name: "magnesium", type: "metaal" },
      { name: "mangaan", type: "metaal" },
      { name: "natrium", type: "metaal" },
      { name: "nikkel", type: "metaal" },
      { name: "platina", type: "metaal" },
      { name: "radium", type: "metaal" },
      { name: "tin", type: "metaal" },
      { name: "titaan", type: "metaal" },
      { name: "uraan", type: "metaal" },
      { name: "wolfraam", type: "metaal" },
      { name: "ijzer", type: "metaal" },
      { name: "zilver", type: "metaal" },
      { name: "zink", type: "metaal" },
    
      // -- Niet-metalen --
      { name: "argon", type: "niet" },
      { name: "broom", type: "niet" },
      { name: "chloor", type: "niet" },
      { name: "fluor", type: "niet" },
      { name: "fosfor", type: "niet" },
      { name: "helium", type: "niet" },
      { name: "jood", type: "niet" },
      { name: "koolstof", type: "niet" },
      { name: "neon", type: "niet" },
      { name: "silicium", type: "niet" },
      { name: "stikstof", type: "niet" },
      { name: "waterstof", type: "niet" },
      { name: "zuurstof", type: "niet" },
      { name: "zwavel", type: "niet" }
    ];
    
  
    // Build question queue
    const questionQueue = metalsData.map(el => ({
      question: el.name, 
      correctType: el.type // "metaal" or "niet"
    }));
    shuffleArray(questionQueue);
  
    let currentIndex = 0;
    let totalMistakes = 0;
    const mistakesMap = {};
  
    // Timer
    let startTime = null;
    let timerInterval = null;
  
    // === Anti-Double-Click Flag ===
    // We'll set this to true when a new question is shown,
    // then set to false immediately after the user clicks.
    let canClick = false;
  
    // Countdown
    let countdownValue = 3;
    const countdownInt = setInterval(() => {
      countdownNumber.textContent = countdownValue;
      countdownValue--;
      if (countdownValue < 0) {
        clearInterval(countdownInt);
        startGame();
      }
    }, 1000);
  
    function startGame() {
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
      if (currentIndex >= questionQueue.length) {
        endGame();
        return;
      }
      // Reset feedback
      feedbackEl.classList.add("hidden");
      feedbackEl.textContent = "";
  
      // Show the new question
      const currentQ = questionQueue[currentIndex];
      questionText.textContent = currentQ.question;
  
      // Now allow a click
      canClick = true;
    }
  
    // Button handlers
    btnMetaal.addEventListener("click", () => checkAnswer("metaal"));
    btnNietMetaal.addEventListener("click", () => checkAnswer("niet"));
  
    function checkAnswer(userChoice) {
      // If we've already clicked or are in the middle of feedback, ignore
      if (!canClick || currentIndex >= questionQueue.length) return;
      // Lock out further clicks
      canClick = false;
  
      const currentQ = questionQueue[currentIndex];
      const qName = currentQ.question;
  
      if (userChoice === currentQ.correctType) {
        // correct
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
        // wrong
        totalMistakes++;
        mistakesMap[qName] = (mistakesMap[qName] || 0) + 1;
  
        const correctStr = (currentQ.correctType === "metaal") ? "Metaal" : "Niet-metaal";
        feedbackEl.textContent = `Fout! ${qName} is: ${correctStr}`;
        feedbackEl.classList.remove("hidden", "correct");
        feedbackEl.classList.add("wrong");
  
        // Remove from queue
        const [removedQ] = questionQueue.splice(currentIndex, 1);
  
        // Reinsert 3 later
        const newPos = Math.min(currentIndex + 3, questionQueue.length);
        questionQueue.splice(newPos, 0, removedQ);
  
        // Also push a clone at the end
        questionQueue.push({ ...removedQ });
  
        // We'll re-enable clicking once feedback is done
        setTimeout(() => {
          feedbackEl.classList.add("hidden");
          feedbackEl.classList.remove("wrong");
  
          showQuestion(); // This sets canClick = true again
        }, 3000);
      }
    }
  
    function endGame() {
      clearInterval(timerInterval);
      quizContainer.classList.add("hidden");
      resultsContainer.classList.remove("hidden");
  
      finalHeading.textContent = `Goed gedaan, ${playerName}!`;
      finalTimeEl.textContent = `Tijd: ${timerEl.textContent}`;
  
      // Build distribution for mistakes
      const distribution = {};
      const uniqueNames = new Set(questionQueue.map(q => q.question));
      // fill in 0 for questions not in mistakesMap
      uniqueNames.forEach(name => {
        if (!mistakesMap[name]) mistakesMap[name] = 0;
      });
  
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
        const howManyQ = distribution[mCount];
        const colDiv = document.createElement("div");
        colDiv.classList.add("dist-column");
  
        const bar = document.createElement("div");
        bar.classList.add("dist-bar");
        const barPx = (howManyQ / maxCount) * maxBarHeight;
        bar.style.height = `${barPx}px`;
        bar.textContent = howManyQ;
  
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
  