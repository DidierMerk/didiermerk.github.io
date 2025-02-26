/**
 * ChemieHub - Leer de Elementen Game
 * Main JavaScript for the Elements learning game
 */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM References ===
    const countdownScreen = document.getElementById('countdownScreen');
    const quizScreen = document.getElementById('quizScreen');
    const resultsScreen = document.getElementById('resultsScreen');
    
    const countdownNumber = document.getElementById('countdownNumber');
    const question = document.getElementById('question');
    const elementSymbol = document.getElementById('elementSymbol');
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
    let correctCount = 0;
    
    // Audio Context (initialized on user interaction)
    let audioContext;
    let gainNode;
    let isMuted = localStorage.getItem('muted') === 'true';
    
    // Update sound toggle button state
    updateSoundToggle();
  
    // === Element Data ===
    const elementsData = [
      // Metals
      { name: "aluminium", symbol: "Al", number: 13, category: "metal" },
      { name: "barium", symbol: "Ba", number: 56, category: "metal" },
      { name: "calcium", symbol: "Ca", number: 20, category: "metal" },
      { name: "chroom", symbol: "Cr", number: 24, category: "metal" },
      { name: "goud", symbol: "Au", number: 79, category: "metal" },
      { name: "kalium", symbol: "K", number: 19, category: "metal" },
      { name: "kobalt", symbol: "Co", number: 27, category: "metal" },
      { name: "koper", symbol: "Cu", number: 29, category: "metal" },
      { name: "kwik", symbol: "Hg", number: 80, category: "metal" },
      { name: "lood", symbol: "Pb", number: 82, category: "metal" },
      { name: "magnesium", symbol: "Mg", number: 12, category: "metal" },
      { name: "mangaan", symbol: "Mn", number: 25, category: "metal" },
      { name: "natrium", symbol: "Na", number: 11, category: "metal" },
      { name: "nikkel", symbol: "Ni", number: 28, category: "metal" },
      { name: "platina", symbol: "Pt", number: 78, category: "metal" },
      { name: "radium", symbol: "Ra", number: 88, category: "metal" },
      { name: "tin", symbol: "Sn", number: 50, category: "metal" },
      { name: "titaan", symbol: "Ti", number: 22, category: "metal" },
      { name: "uraan", symbol: "U", number: 92, category: "metal" },
      { name: "wolfraam", symbol: "W", number: 74, category: "metal" },
      { name: "ijzer", symbol: "Fe", number: 26, category: "metal" },
      { name: "zilver", symbol: "Ag", number: 47, category: "metal" },
      { name: "zink", symbol: "Zn", number: 30, category: "metal" },
    
      // Non-metals
      { name: "argon", symbol: "Ar", number: 18, category: "non-metal" },
      { name: "broom", symbol: "Br", number: 35, category: "non-metal" },
      { name: "chloor", symbol: "Cl", number: 17, category: "non-metal" },
      { name: "fluor", symbol: "F", number: 9, category: "non-metal" },
      { name: "fosfor", symbol: "P", number: 15, category: "non-metal" },
      { name: "helium", symbol: "He", number: 2, category: "non-metal" },
      { name: "jood", symbol: "I", number: 53, category: "non-metal" },
      { name: "koolstof", symbol: "C", number: 6, category: "non-metal" },
      { name: "neon", symbol: "Ne", number: 10, category: "non-metal" },
      { name: "silicium", symbol: "Si", number: 14, category: "non-metal" },
      { name: "stikstof", symbol: "N", number: 7, category: "non-metal" },
      { name: "waterstof", symbol: "H", number: 1, category: "non-metal" },
      { name: "zuurstof", symbol: "O", number: 8, category: "non-metal" },
      { name: "zwavel", symbol: "S", number: 16, category: "non-metal" }
    ];
  
    // Build question queue - each element gets asked two ways (name→symbol and symbol→name)
    let questionQueue = [];
    for (const el of elementsData) {
      // Ask for symbol
      questionQueue.push({
        text: `Wat is het symbool van ${el.name}?`,
        answer: el.symbol,
        displayName: el.name,
        displaySymbol: '?',
        displayNumber: el.number,
        type: 'nameToSymbol'
      });
      
      // Ask for name
      questionQueue.push({
        text: `Wat is de naam van dit element?`,
        answer: el.name,
        displayName: '?',
        displaySymbol: el.symbol,
        displayNumber: el.number,
        type: 'symbolToName'
      });
    }
    
    // Shuffle the questions
    shuffleArray(questionQueue);
    
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
      questionCount = questionQueue.length;
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
      if (currentIndex >= questionQueue.length) {
        endGame();
        return;
      }
      
      const currentQ = questionQueue[currentIndex];
      
      // Update the question text
      question.textContent = currentQ.text;
      
      // Update the element display
      elementSymbol.textContent = currentQ.displaySymbol;
      elementSymbol.setAttribute('data-number', currentQ.displayNumber);
      
      // Clear previous input and focus
      answerInput.value = '';
      answerInput.focus();
      
      // Hide the feedback
      feedback.classList.remove('visible', 'correct', 'wrong');
      
      // Update visual cues
      updateProgressBar();
    }
  
    function updateProgressBar() {
      const totalQuestions = questionCount;
      const completedQuestions = currentIndex;
      const remainingQuestions = questionQueue.length - currentIndex;
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
      if (currentIndex >= questionQueue.length) return;
      
      const userAnswer = answerInput.value.trim().toLowerCase();
      const currentQ = questionQueue[currentIndex];
      const correctAnswer = currentQ.answer.toLowerCase();
      
      if (userAnswer === correctAnswer) {
        // Correct answer
        feedback.textContent = 'Correct!';
        feedback.classList.add('visible', 'correct');
        feedback.classList.remove('wrong');
        
        // Animate the element symbol
        elementSymbol.classList.add('element-correct');
        elementSymbol.classList.add('highlight');
        
        // Play success sound
        playSound('correct');
        
        correctCount++;
        
        // Move to next question after a delay
        setTimeout(() => {
          elementSymbol.classList.remove('element-correct', 'highlight');
          feedback.classList.remove('visible');
          currentIndex++;
          showQuestion();
        }, 1000);
      } else {
        // Wrong answer
        totalMistakes++;
        
        // Track mistake for this question
        const questionKey = currentQ.text;
        questionMistakesMap[questionKey] = (questionMistakesMap[questionKey] || 0) + 1;
        
        feedback.textContent = `Fout! Het juiste antwoord is: ${currentQ.answer}`;
        feedback.classList.add('visible', 'wrong');
        feedback.classList.remove('correct');
        
        // Play error sound
        playSound('wrong');
        
        // Add shake animation to the input
        answerInput.classList.add('shake');
        setTimeout(() => {
          answerInput.classList.remove('shake');
        }, 500);
        
        // Remove from queue, reinsert further, and add a clone to the end
        const [removedQ] = questionQueue.splice(currentIndex, 1);
        const newPos = Math.min(currentIndex + 3, questionQueue.length);
        questionQueue.splice(newPos, 0, removedQ);
        questionQueue.push({ ...removedQ });
        
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
      // Build distribution from questionMistakesMap
      const distribution = {};
      Object.values(questionMistakesMap).forEach(m => {
        distribution[m] = (distribution[m] || 0) + 1;
      });
      
      // Also count questions with 0 mistakes
      const questionsWithMistakes = Object.keys(questionMistakesMap).length;
      const questionsWithoutMistakes = elementsData.length * 2 - questionsWithMistakes;
      
      if (questionsWithoutMistakes > 0) {
        distribution[0] = questionsWithoutMistakes;
      }
      
      // Get sorted mistake counts
      const mistakeCounts = Object.keys(distribution)
        .map(k => parseInt(k, 10))
        .sort((a, b) => a - b);
      
      // Clear previous chart
      mistakesChart.innerHTML = '';
      
      // Find the maximum value for scaling
      const maxCount = Math.max(...Object.values(distribution));
      
      // Create bars
      mistakeCounts.forEach(count => {
        const numberOfQuestions = distribution[count];
        const barHeight = (numberOfQuestions / maxCount) * 100;
        
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${barHeight}%`;
        bar.setAttribute('data-value', numberOfQuestions);
        bar.setAttribute('data-label', count);
        
        mistakesChart.appendChild(bar);
      });
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
  
  // Initialize particles.js
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
          "value": ["#00e2cd", "#3498db", "#5cffbc"]
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
          "color": "#00e2cd",
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