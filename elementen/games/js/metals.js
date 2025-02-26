/**
 * ChemieHub - Leer de Metalen Game
 * Main JavaScript for the Metals learning game
 */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM References ===
    const countdownScreen = document.getElementById('countdownScreen');
    const quizScreen = document.getElementById('quizScreen');
    const resultsScreen = document.getElementById('resultsScreen');
    
    const countdownNumber = document.getElementById('countdownNumber');
    const question = document.getElementById('question');
    const metalElement = document.getElementById('metalElement');
    const metalSymbol = document.getElementById('metalSymbol');
    const metalName = document.getElementById('metalName');
    const metalNumber = document.getElementById('metalNumber');
    const twoButtonContainer = document.getElementById('twoButtonContainer');
    const fourButtonContainer = document.getElementById('fourButtonContainer');
    const btnMetaal = document.getElementById('btnMetaal');
    const btnNietMetaal = document.getElementById('btnNietMetaal');
    const btnEdel = document.getElementById('btnEdel');
    const btnHalfEdel = document.getElementById('btnHalfEdel');
    const btnOnedel = document.getElementById('btnOnedel');
    const btnZeerOnedel = document.getElementById('btnZeerOnedel');
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
    let mistakesMap = {};
    let startTime = null;
    let timerInterval = null;
    let questionCount = 0;
    let canClick = true;
    
    // Audio Context (initialized on user interaction)
    let audioContext;
    let gainNode;
    let isMuted = localStorage.getItem('muted') === 'true';
    
    // Update sound toggle button state
    updateSoundToggle();
  
    // === Metals Data ===
    // 2-button questions (metal vs non-metal)
    const metalVsNonMetalQuestions = [
      // Metals
      { name: "aluminium", symbol: "Al", number: 13, correctAnswer: "metaal", answerType: "2" },
      { name: "barium", symbol: "Ba", number: 56, correctAnswer: "metaal", answerType: "2" },
      { name: "calcium", symbol: "Ca", number: 20, correctAnswer: "metaal", answerType: "2" },
      { name: "chroom", symbol: "Cr", number: 24, correctAnswer: "metaal", answerType: "2" },
      { name: "goud", symbol: "Au", number: 79, correctAnswer: "metaal", answerType: "2" },
      { name: "kalium", symbol: "K", number: 19, correctAnswer: "metaal", answerType: "2" },
      { name: "kobalt", symbol: "Co", number: 27, correctAnswer: "metaal", answerType: "2" },
      { name: "koper", symbol: "Cu", number: 29, correctAnswer: "metaal", answerType: "2" },
      { name: "kwik", symbol: "Hg", number: 80, correctAnswer: "metaal", answerType: "2" },
      { name: "lood", symbol: "Pb", number: 82, correctAnswer: "metaal", answerType: "2" },
      { name: "magnesium", symbol: "Mg", number: 12, correctAnswer: "metaal", answerType: "2" },
      { name: "mangaan", symbol: "Mn", number: 25, correctAnswer: "metaal", answerType: "2" },
      { name: "natrium", symbol: "Na", number: 11, correctAnswer: "metaal", answerType: "2" },
      { name: "nikkel", symbol: "Ni", number: 28, correctAnswer: "metaal", answerType: "2" },
      { name: "platina", symbol: "Pt", number: 78, correctAnswer: "metaal", answerType: "2" },
      { name: "radium", symbol: "Ra", number: 88, correctAnswer: "metaal", answerType: "2" },
      { name: "tin", symbol: "Sn", number: 50, correctAnswer: "metaal", answerType: "2" },
      { name: "titaan", symbol: "Ti", number: 22, correctAnswer: "metaal", answerType: "2" },
      { name: "uraan", symbol: "U", number: 92, correctAnswer: "metaal", answerType: "2" },
      { name: "wolfraam", symbol: "W", number: 74, correctAnswer: "metaal", answerType: "2" },
      { name: "ijzer", symbol: "Fe", number: 26, correctAnswer: "metaal", answerType: "2" },
      { name: "zilver", symbol: "Ag", number: 47, correctAnswer: "metaal", answerType: "2" },
      { name: "zink", symbol: "Zn", number: 30, correctAnswer: "metaal", answerType: "2" },
  
      // Non-metals
      { name: "argon", symbol: "Ar", number: 18, correctAnswer: "niet", answerType: "2" },
      { name: "broom", symbol: "Br", number: 35, correctAnswer: "niet", answerType: "2" },
      { name: "chloor", symbol: "Cl", number: 17, correctAnswer: "niet", answerType: "2" },
      { name: "fluor", symbol: "F", number: 9, correctAnswer: "niet", answerType: "2" },
      { name: "fosfor", symbol: "P", number: 15, correctAnswer: "niet", answerType: "2" },
      { name: "helium", symbol: "He", number: 2, correctAnswer: "niet", answerType: "2" },
      { name: "jood", symbol: "I", number: 53, correctAnswer: "niet", answerType: "2" },
      { name: "koolstof", symbol: "C", number: 6, correctAnswer: "niet", answerType: "2" },
      { name: "neon", symbol: "Ne", number: 10, correctAnswer: "niet", answerType: "2" },
      { name: "silicium", symbol: "Si", number: 14, correctAnswer: "niet", answerType: "2" },
      { name: "stikstof", symbol: "N", number: 7, correctAnswer: "niet", answerType: "2" },
      { name: "waterstof", symbol: "H", number: 1, correctAnswer: "niet", answerType: "2" },
      { name: "zuurstof", symbol: "O", number: 8, correctAnswer: "niet", answerType: "2" },
      { name: "zwavel", symbol: "S", number: 16, correctAnswer: "niet", answerType: "2" },
    ];
  
    // 4-button questions (metal categories)
    const metalCategoryQuestions = [
      // Edel
      { name: "goud", symbol: "Au", number: 79, correctAnswer: "Edel", answerType: "4" },
      { name: "zilver", symbol: "Ag", number: 47, correctAnswer: "Edel", answerType: "4" },
      { name: "platina", symbol: "Pt", number: 78, correctAnswer: "Edel", answerType: "4" },
  
      // Half edel
      { name: "koper", symbol: "Cu", number: 29, correctAnswer: "Half edel", answerType: "4" },
      { name: "kwik", symbol: "Hg", number: 80, correctAnswer: "Half edel", answerType: "4" },
  
      // Onedel
      { name: "ijzer", symbol: "Fe", number: 26, correctAnswer: "Onedel", answerType: "4" },
      { name: "aluminium", symbol: "Al", number: 13, correctAnswer: "Onedel", answerType: "4" },
      { name: "zink", symbol: "Zn", number: 30, correctAnswer: "Onedel", answerType: "4" },
  
      // Zeer Onedel
      { name: "kalium", symbol: "K", number: 19, correctAnswer: "Zeer Onedel", answerType: "4" },
      { name: "natrium", symbol: "Na", number: 11, correctAnswer: "Zeer Onedel", answerType: "4" },
      { name: "magnesium", symbol: "Mg", number: 12, correctAnswer: "Zeer Onedel", answerType: "4" },
      { name: "calcium", symbol: "Ca", number: 20, correctAnswer: "Zeer Onedel", answerType: "4" },
    ];
  
    // Combine both sets
    let questionQueue = [...metalVsNonMetalQuestions, ...metalCategoryQuestions];
    
    // Shuffle all questions
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
      
      // Reset click state
      canClick = true;
      
      // Hide feedback from previous question
      feedback.classList.remove('visible', 'correct', 'wrong');
      
      // Hide both button containers first
      twoButtonContainer.classList.add('hidden');
      fourButtonContainer.classList.add('hidden');
      
      const currentQ = questionQueue[currentIndex];
      
      // Update metal display
      metalName.textContent = currentQ.name;
      metalSymbol.textContent = currentQ.symbol;
      metalNumber.textContent = currentQ.number;
      
      // Add shine animation
      metalElement.classList.add('metal-shine');
      
      // Set the question text based on question type
      if (currentQ.answerType === "2") {
        question.textContent = `Is ${currentQ.name} een metaal of niet-metaal?`;
        twoButtonContainer.classList.remove('hidden');
      } else {
        // "4"
        question.textContent = `Wat voor soort metaal is ${currentQ.name}?`;
        fourButtonContainer.classList.remove('hidden');
      }
      
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
    function checkAnswer(userChoice) {
      if (!canClick || currentIndex >= questionQueue.length) return;
      
      // Prevent multiple clicks
      canClick = false;
      
      const currentQ = questionQueue[currentIndex];
      
      if (userChoice === currentQ.correctAnswer) {
        // Correct answer
        feedback.textContent = 'Correct!';
        feedback.classList.add('visible', 'correct');
        feedback.classList.remove('wrong');
        
        // Remove shine animation
        metalElement.classList.remove('metal-shine');
        
        // Play success sound
        playSound('correct');
        
        // Move to next question after a delay
        setTimeout(() => {
          feedback.classList.remove('visible');
          currentIndex++;
          showQuestion();
        }, 1000);
      } else {
        // Wrong answer
        totalMistakes++;
        
        // Track mistake for this element
        mistakesMap[currentQ.name] = (mistakesMap[currentQ.name] || 0) + 1;
        
        feedback.textContent = `Fout! ${currentQ.name} is ${currentQ.correctAnswer}`;
        feedback.classList.add('visible', 'wrong');
        feedback.classList.remove('correct');
        
        // Play error sound
        playSound('wrong');
        
        // Remove from queue
        const [removedQ] = questionQueue.splice(currentIndex, 1);
        
        // Reinsert 3 places later
        const newPos = Math.min(currentIndex + 3, questionQueue.length);
        questionQueue.splice(newPos, 0, removedQ);
        
        // Also add a clone to the end
        questionQueue.push({ ...removedQ });

        updateProgressBar();
        
        // Set timeout for feedback
        setTimeout(() => {
          feedback.classList.remove('visible');
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
      // Categories for chart
      const categories = {
        'metaal': { count: 0, label: 'Metaal' },
        'niet': { count: 0, label: 'Niet-metaal' },
        'Edel': { count: 0, label: 'Edel' },
        'Half edel': { count: 0, label: 'Half edel' },
        'Onedel': { count: 0, label: 'Onedel' },
        'Zeer Onedel': { count: 0, label: 'Zeer Onedel' }
      };
      
      // Count mistakes per category
      questionQueue.forEach(q => {
        const questionName = q.name;
        const questionCategory = q.correctAnswer;
        
        if (mistakesMap[questionName] && mistakesMap[questionName] > 0) {
          categories[questionCategory].count += mistakesMap[questionName];
        }
      });
      
      // Filter out categories with no mistakes
      const relevantCategories = Object.entries(categories)
        .filter(([_, data]) => data.count > 0)
        .sort((a, b) => b[1].count - a[1].count); // Sort by count descending
      
      // Clear previous chart
      mistakesChart.innerHTML = '';
      
      // Find the maximum value for scaling
      const maxCount = Math.max(...relevantCategories.map(([_, data]) => data.count));
      
      // Create bars
      relevantCategories.forEach(([category, data]) => {
        const barHeight = (data.count / maxCount) * 100;
        
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${barHeight}%`;
        bar.setAttribute('data-value', data.count);
        bar.setAttribute('data-label', data.label);
        
        mistakesChart.appendChild(bar);
      });
      
      // If no mistakes, show a dummy bar
      if (relevantCategories.length === 0) {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = '100%';
        bar.setAttribute('data-value', '0');
        bar.setAttribute('data-label', 'Geen fouten');
        
        mistakesChart.appendChild(bar);
      }
    }
  
    // === Event Listeners ===
    // Metal/Non-metal buttons
    btnMetaal.addEventListener('click', () => checkAnswer('metaal'));
    btnNietMetaal.addEventListener('click', () => checkAnswer('niet'));
    
    // Metal category buttons
    btnEdel.addEventListener('click', () => checkAnswer('Edel'));
    btnHalfEdel.addEventListener('click', () => checkAnswer('Half edel'));
    btnOnedel.addEventListener('click', () => checkAnswer('Onedel'));
    btnZeerOnedel.addEventListener('click', () => checkAnswer('Zeer Onedel'));
    
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
  
  // Initialize particles.js with golden/amber colors for metals theme
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
          "value": ["#ffcc00", "#ff9f43", "#ffc048"]
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
          "color": "#ffcc00",
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