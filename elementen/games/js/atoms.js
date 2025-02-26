/**
 * ChemieHub - Leer de Atomen Game
 * Main JavaScript for the Atoms learning game
 */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM References ===
    const countdownScreen = document.getElementById('countdownScreen');
    const quizScreen = document.getElementById('quizScreen');
    const resultsScreen = document.getElementById('resultsScreen');
    
    const countdownNumber = document.getElementById('countdownNumber');
    const question = document.getElementById('question');
    const questionImage = document.getElementById('questionImage');
    const atomVisualization = document.getElementById('atomVisualization');
    const answerInput = document.getElementById('answerInput');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('feedback');
    const timer = document.getElementById('timer');
    const progressBar = document.getElementById('progressBar');
    
    const playerResult = document.getElementById('playerResult');
    const totalQuestionsValue = document.getElementById('totalQuestionsValue');
    const mistakesValue = document.getElementById('mistakesValue');
    const mistakesChart = document.getElementById('mistakesChart');
    const backToMenuBtn = document.getElementById('backToMenuBtn');
    const soundToggle = document.getElementById('soundToggle');
  
    // === Game State ===
    let currentIndex = 0;
    let totalMistakes = 0;
    let questionMistakesMap = {};
    let startTime = null;
    let timerInterval = null;
    let questionCount = 0;
    
    // Audio Context (initialized on user interaction)
    let audioContext;
    let gainNode;
    let isMuted = localStorage.getItem('muted') === 'true';
    
    // Update sound toggle button state
    updateSoundToggle();
  
    // === Questions Array ===
    const questions = [];
  
    // 1) Two-atomic elements
    questions.push({
      question: "Noem alle twee-atomige elementen",
      answer: "waterstof, stikstof, zuurstof, fluor, chloor, broom, jood",
      img: null,
      category: "twee-atomig"
    });
  
    // 2) Atomic mass unit
    questions.push({
      question: "Hoeveel kg is 1,00U?",
      answer: "1,66*10^-27",
      img: null,
      category: "massa"
    });
  
    // 3) Atom masses
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
        img: null,
        category: "massa"
      });
    });
  
    // 4) Element groups pictures
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
        question: "Welke groep elementen is dit?",
        answer: item.answer,
        img: `../assets/groepen/${item.file}`,
        category: "groepen"
      });
    });
  
    // 5) Atom types pictures
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
        img: `../assets/atoomsoorten/${item.file}`,
        category: "atoomsoorten"
      });
    });
  
    // 6) Formula pictures
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
        img: `../assets/formules/${item.file}`,
        category: "formules"
      });
    });
  
    // 7) Molecule formulas
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
        img: null,
        category: "molecuulformules"
      });
    });
  
    // Shuffle all questions
    shuffleArray(questions);
    
    // === Countdown Timer ===
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
      // Transition from countdown to quiz screen
      transitionScreens(countdownScreen, quizScreen);
      
      // Initialize game data
      questionCount = questions.length;
      totalQuestionsValue.textContent = questionCount;
      updateProgressBar();
      
      // Start the timer
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 1000);
      
      // Show first question
      showQuestion();
      
      // Play start sound
      playSound('start');
    }
  
    function showQuestion() {
      if (currentIndex >= questions.length) {
        endGame();
        return;
      }
      
      const currentQ = questions[currentIndex];
      
      // Hide feedback
      feedback.classList.remove('visible', 'correct', 'wrong');
      
      // Update the question text
      question.textContent = currentQ.question;
      
      // Show or hide atom visualization based on question type
      if (currentQ.img) {
        // Image-based question
        questionImage.src = currentQ.img;

        // Let CSS handle the sizing (removing inline styles)
        questionImage.classList.remove('hidden');
        atomVisualization.classList.add('hidden');
      } else {
        // Text-based question
        questionImage.classList.add('hidden');
        atomVisualization.classList.remove('hidden');
        
        // Adjust atom visualization based on category
        if (currentQ.category === "molecuulformules") {
          // For molecular formula questions, make the atom display more complex
          atomVisualization.querySelector('.electron-orbit:nth-child(1)').style.animation = 'rotate 3s linear infinite';
          atomVisualization.querySelector('.electron-orbit:nth-child(2)').style.animation = 'rotate 5s linear infinite reverse';
          atomVisualization.querySelector('.electron-orbit:nth-child(3)').style.animation = 'rotate 7s linear infinite';
        } else {
          // Default animation speeds
          atomVisualization.querySelector('.electron-orbit:nth-child(1)').style.animation = 'rotate 5s linear infinite';
          atomVisualization.querySelector('.electron-orbit:nth-child(2)').style.animation = 'rotate 8s linear infinite';
          atomVisualization.querySelector('.electron-orbit:nth-child(3)').style.animation = 'rotate 12s linear infinite';
        }
      }
      
      // Clear previous input and focus
      answerInput.value = '';
      answerInput.focus();
      
      // Update visual cues
      updateProgressBar();
    }
  
    function updateProgressBar() {
        const totalQuestions = questionCount;
        const completedQuestions = currentIndex;
        const remainingQuestions = questions.length - currentIndex;  // FIXED: questions instead of questionQueue
        const progress = (completedQuestions / (completedQuestions + remainingQuestions)) * 100;
        progressBar.style.width = `${progress}%`;
    }
  
    function updateTimer() {
      const elapsed = Date.now() - startTime;
      const seconds = Math.floor(elapsed / 1000);
      const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
      const ss = String(seconds % 60).padStart(2, '0');
      timer.textContent = `${mm}:${ss}`;
    }
  
    // === Answer Checking ===
    function checkAnswer() {
      if (currentIndex >= questions.length) return;
      
      const userAnswer = answerInput.value.trim().toLowerCase();
      const currentQ = questions[currentIndex];
      const correctAnswer = currentQ.answer.toLowerCase();
      
      // Create a key for tracking mistakes
      const questionKey = currentQ.question || currentQ.img || "(unknown)";
      
      // Special case: For two-atomic elements, we need to check if all are mentioned
      if (currentQ.category === "twee-atomig") {
        const requiredElements = ["waterstof", "stikstof", "zuurstof", "fluor", "chloor", "broom", "jood"];
        const userElements = userAnswer.split(/,\s*/).map(el => el.trim().toLowerCase());
        
        // Check if all required elements are included in user answer
        const missingElements = requiredElements.filter(el => !userElements.includes(el));
        const extraElements = userElements.filter(el => !requiredElements.includes(el) && el !== "");
        
        if (missingElements.length === 0 && extraElements.length === 0) {
          // All correct!
          handleCorrectAnswer();
        } else {
          // Incorrect
          let errorMessage = "Fout! ";
          if (missingElements.length > 0) {
            errorMessage += `Je mist: ${missingElements.join(", ")}. `;
          }
          if (extraElements.length > 0) {
            errorMessage += `Onjuiste elementen: ${extraElements.join(", ")}. `;
          }
          errorMessage += `Juiste antwoord: ${correctAnswer}`;
          
          handleWrongAnswer(errorMessage);
        }
      } else {
        // Regular answer checking
        if (userAnswer === correctAnswer) {
          handleCorrectAnswer();
        } else {
          handleWrongAnswer(`Fout! Juiste antwoord: ${correctAnswer}`);
        }
      }
    }
    
    function handleCorrectAnswer() {
      // Correct answer
      feedback.textContent = 'Correct!';
      feedback.classList.add('visible', 'correct');
      feedback.classList.remove('wrong');
      
      // Add animation to atom nucleus
      const nucleus = atomVisualization.querySelector('.atom-nucleus');
      nucleus.style.animation = 'nucleusPulse 0.6s ease';
      
      // Play success sound
      playSound('correct');
      
      // Move to next question after a delay
      setTimeout(() => {
        nucleus.style.animation = '';
        feedback.classList.remove('visible');
        currentIndex++;
        showQuestion();
      }, 1000);
    }
    
    function handleWrongAnswer(errorMessage) {
      // Wrong answer
      totalMistakes++;
      
      // Track mistake for this question
      questionMistakesMap[currentIndex] = (questionMistakesMap[currentIndex] || 0) + 1;
      
      feedback.textContent = errorMessage;
      feedback.classList.add('visible', 'wrong');
      feedback.classList.remove('correct');
      
      // Play error sound
      playSound('wrong');
      
      // Add shake animation to the input
      answerInput.classList.add('shake');
      setTimeout(() => {
        answerInput.classList.remove('shake');
      }, 500);
      
      // Remove from current position, reinsert it further in the queue
      const [removedQ] = questions.splice(currentIndex, 1);
      const newPos = Math.min(currentIndex + 3, questions.length);
      questions.splice(newPos, 0, removedQ);
      
      // Also clone this question and add to end (reinforcement learning)
      questions.push({ ...removedQ });
      
      // Disable input briefly
      answerInput.disabled = true;
      submitBtn.disabled = true;

      updateProgressBar();
      
      setTimeout(() => {
        feedback.classList.remove('visible');
        answerInput.disabled = false;
        submitBtn.disabled = false;
        answerInput.value = '';
        answerInput.focus();
        showQuestion();
      }, 3000);
    }
  
    // === End Game ===
    function endGame() {
      // Stop the timer
      clearInterval(timerInterval);
      
      // Show results screen
      transitionScreens(quizScreen, resultsScreen);
      
      // Play completion sound
      playSound('complete');
      
      // Set player results
      const playerName = localStorage.getItem('playerName') || 'Speler';
      playerResult.textContent = `${playerName}, je hebt het voltooid in ${timer.textContent}`;
      mistakesValue.textContent = totalMistakes;
      
      // Generate mistake distribution chart
      generateMistakeChart();
    }
  
    function generateMistakeChart() {
        // No chart generation needed anymore
        // We've removed the chart from the UI
        
        // Update the stats
        mistakesValue.textContent = totalMistakes;
        totalQuestionsValue.textContent = questionCount;
        
        // Set player results with name
        const playerName = localStorage.getItem('playerName') || 'Speler';
        playerResult.textContent = `${playerName}, je hebt het voltooid in ${timer.textContent}`;
    }
    
    function formatCategoryName(category) {
      const categoryNames = {
        'twee-atomig': 'Twee-atomig',
        'massa': 'Massa',
        'groepen': 'Groepen',
        'atoomsoorten': 'Atoomsoorten',
        'formules': 'Formules',
        'molecuulformules': 'Moleculen'
      };
      
      return categoryNames[category] || category;
    }
  
    // === Event Listeners ===
    submitBtn.addEventListener('click', checkAnswer);
    
    answerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        checkAnswer();
      }
    });
    
    backToMenuBtn.addEventListener('click', () => {
      window.location.href = '../index.html';
      playSound('click');
    });
    
    soundToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      localStorage.setItem('muted', isMuted);
      updateSoundToggle();
      
      if (!isMuted) {
        playSound('click');
      }
    });
  
    // === Helper Functions ===
    function transitionScreens(fromScreen, toScreen) {
      // Hide current screen
      fromScreen.classList.remove('active');
      
      // Show target screen after a short delay
      setTimeout(() => {
        toScreen.classList.add('active');
      }, 300);
    }
  
    function updateSoundToggle() {
      if (isMuted) {
        soundToggle.classList.add('muted');
      } else {
        soundToggle.classList.remove('muted');
      }
    }
  
    function playSound(type) {
      if (isMuted) return;
      
      // Initialize AudioContext on first user interaction
      if (!audioContext) {
        try {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          gainNode = audioContext.createGain();
          gainNode.connect(audioContext.destination);
        } catch (e) {
          console.error('Web Audio API not supported:', e);
          return;
        }
      }
      
      // Create oscillator
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configure sound based on type
      switch (type) {
        case 'click':
          gainNode.gain.value = 0.1;
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            880, audioContext.currentTime + 0.1
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'correct':
          gainNode.gain.value = 0.1;
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            880, audioContext.currentTime + 0.2
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
          
        case 'wrong':
          gainNode.gain.value = 0.15;
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            220, audioContext.currentTime + 0.2
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
          
        case 'start':
          playChord([440, 554.37, 659.25], 0.3, 'triangle');
          break;
          
        case 'complete':
          playChord([523.25, 659.25, 783.99], 0.5, 'triangle');
          break;
      }
    }
  
    function playChord(frequencies, duration, type) {
      if (!audioContext) return;
      
      frequencies.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.value = freq;
        
        gainNode.gain.value = 0.1 / frequencies.length;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(audioContext.currentTime + (i * 0.05));
        oscillator.stop(audioContext.currentTime + duration);
        
        // Fade out
        gainNode.gain.exponentialRampToValueAtTime(
          0.001, audioContext.currentTime + duration
        );
      });
    }
  
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  });
  
  // Initialize particles.js with purple/violet colors for atoms theme
  document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": ["#8a2be2", "#a55eea", "#b19cd9"]
        },
        "shape": {
          "type": ["circle"],
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#8a2be2",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.8
            }
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  });