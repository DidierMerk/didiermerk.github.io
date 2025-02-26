/**
 * ChemieHub - Main JavaScript
 * Handles user journey, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const landingScreen = document.getElementById('landing-screen');
    const selectionScreen = document.getElementById('selection-screen');
    const nameForm = document.getElementById('nameForm');
    const playerNameInput = document.getElementById('playerName');
    const nameErrorMessage = document.getElementById('nameErrorMessage');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const backButton = document.getElementById('backButton');
    const soundToggle = document.getElementById('soundToggle');
    
    // Element symbols for animation
    const elementSymbol = document.getElementById('elementSymbol');
    const metalSymbol = document.getElementById('metalSymbol');
    const atomSymbol = document.getElementById('atomSymbol');
    
    // Game cards
    const gameCards = document.querySelectorAll('.game-card');
    
    // Audio context (initialized on first user interaction)
    let audioContext;
    let gainNode;
    let isMuted = localStorage.getItem('muted') === 'true';

    // Disable auto-filling from browser
    playerNameInput.value = "";
    // Force reset on page load
    setTimeout(() => {
    playerNameInput.value = "";
    }, 0);
    
    // Initialize sound toggle state
    updateSoundToggle();
    
    // Initialize player name if stored
    const storedName = localStorage.getItem('playerName');
    if (storedName) {
      playerNameInput.value = storedName;
      simulateInputFocus();
    }
    
    // Add input validation
    playerNameInput.addEventListener('input', () => {
      const value = playerNameInput.value;
      const pattern = /^[A-Za-z]*$/;
      
      if (!pattern.test(value)) {
        // Replace any non-letter characters
        playerNameInput.value = value.replace(/[^A-Za-z]/g, '');
        
        // Show error message
        showErrorMessage('Alleen letters (a-z) zijn toegestaan');
        
        // Add error class to input
        playerNameInput.classList.add('error');
        
        // Remove error class after animation
        setTimeout(() => {
          playerNameInput.classList.remove('error');
        }, 600);
        
        // Play error sound
        playSound('error');
      } else {
        // Hide error message if it was showing
        hideErrorMessage();
      }
    });
    
    // Form submission
    nameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = playerNameInput.value.trim();
      if (!name || name.length < 1) {
        // Show empty name error
        showErrorMessage('Voer je naam in om door te gaan');
        
        // Highlight input as error
        playerNameInput.classList.add('error');
        
        // Focus the input
        playerNameInput.focus();
        
        // Play error sound
        playSound('error');
        
        // Remove error class after animation
        setTimeout(() => {
          playerNameInput.classList.remove('error');
        }, 600);
        
        return;
      }
      
      // Hide any error message
      hideErrorMessage();
      
      // Store the name
      localStorage.setItem('playerName', name);
      
      // Play success sound
      playSound('success');
      
      // Update welcome message
      welcomeMessage.textContent = `Welkom, ${name}!`;
      
      // Transition to game selection screen
      transitionToScreen(selectionScreen, true);
    });
    
    // Back button
    backButton.addEventListener('click', () => {
      playSound('click');
      transitionToScreen(landingScreen, false);
    });
    
    // Sound toggle
    soundToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      localStorage.setItem('muted', isMuted);
      updateSoundToggle();
      
      if (!isMuted) {
        playSound('click');
      }
    });
    
    // Game card interactions
    gameCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        playSound('hover');
      });
      
      card.addEventListener('click', () => {
        playSound('select');
      });
    });
    
    // Animate element symbols
    animateElementSymbols();
    
    /**
     * Show an error message with animation
     * @param {string} message - The error message to display
     */
    function showErrorMessage(message) {
      nameErrorMessage.textContent = message;
      nameErrorMessage.classList.add('visible');
    }
    
    /**
     * Hide the error message
     */
    function hideErrorMessage() {
      nameErrorMessage.classList.remove('visible');
    }
    
    /**
     * Simulate focus state for input with value
     */
    function simulateInputFocus() {
      if (playerNameInput.value.trim() !== '') {
        playerNameInput.setAttribute('placeholder', ' ');
      }
    }
    
    /**
     * Transitions between screens with sci-fi animation
     * @param {HTMLElement} targetScreen - Screen to transition to
     * @param {boolean} forward - Direction of animation (true = forward, false = backward)
     */
    function transitionToScreen(targetScreen, forward) {
      // Current active screen
      const currentScreen = document.querySelector('.screen.active');
      
      // Exit animation for current screen
      currentScreen.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      currentScreen.style.opacity = '0';
      currentScreen.style.transform = forward ? 'translateY(-30px)' : 'translateY(30px)';
      
      // If going to selection screen, prepare game cards
      if (targetScreen === selectionScreen) {
        // Make sure game cards are initially invisible 
        gameCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
        });
      }
      
      // After exit animation completes
      setTimeout(() => {
        currentScreen.classList.remove('active');
        
        // Prepare target screen for entry animation
        targetScreen.style.transition = 'none';
        targetScreen.style.opacity = '0';
        targetScreen.style.transform = forward ? 'translateY(30px)' : 'translateY(-30px)';
        targetScreen.classList.add('active');
        
        // Trigger reflow
        void targetScreen.offsetWidth;
        
        // Entry animation for target screen
        targetScreen.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        targetScreen.style.opacity = '1';
        targetScreen.style.transform = 'translateY(0)';
        
        // Add staggered animation for game cards if going to selection screen
        if (targetScreen === selectionScreen) {
          setTimeout(() => {
            gameCards.forEach((card, index) => {
              setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 100 * (index + 1));
            });
          }, 200); // Slight delay after screen appears
        }
      }, 500);
    }
    
    /**
     * Animates the element symbols in game selection screen
     */
    function animateElementSymbols() {
      // Simple pulse animation for element symbols
      const symbols = [elementSymbol, metalSymbol, atomSymbol];
      symbols.forEach(symbol => {
        if (symbol) { // Ensure element exists
          setInterval(() => {
            symbol.classList.add('pulse');
            setTimeout(() => {
              symbol.classList.remove('pulse');
            }, 2000);
          }, 4000 + Math.random() * 2000); // Random offset for each symbol
        }
      });
    }
    
    /**
     * Updates the sound toggle button UI
     */
    function updateSoundToggle() {
      if (isMuted) {
        soundToggle.classList.add('muted');
      } else {
        soundToggle.classList.remove('muted');
      }
    }
    
    /**
     * Plays a sound effect
     * @param {string} type - Type of sound to play (click, hover, success, select, error)
     */
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
      
      // Use the Web Audio API for sound generation (instead of audio files)
      let oscillator = audioContext.createOscillator();
      oscillator.connect(gainNode);
      
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
          
        case 'hover':
          gainNode.gain.value = 0.05;
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.05);
          break;
          
        case 'success':
          // Play a success chord
          playChord([440, 554.37, 659.25], 0.3, 'triangle');
          break;
          
        case 'select':
          gainNode.gain.value = 0.15;
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            880, audioContext.currentTime + 0.2
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
          
        case 'error':
          gainNode.gain.value = 0.15;
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            220, audioContext.currentTime + 0.2
          );
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
      }
    }
    
    /**
     * Plays a chord with given frequencies
     * @param {Array} frequencies - Array of frequencies to play
     * @param {number} duration - Duration in seconds
     * @param {string} type - Oscillator type
     */
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
    
    // Initialize focus state of input
    playerNameInput.setAttribute('placeholder', ' ');
    
    // Focus the name input when page loads
    setTimeout(() => {
      playerNameInput.focus();
    }, 500);
  });