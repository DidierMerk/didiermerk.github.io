// script.js
document.getElementById('game-start-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const playerName = document.getElementById('player-name').value;
    if (playerName) {
        // Store the player's name in localStorage for access on the game page
        localStorage.setItem('playerName', playerName);
        // Redirect to the game page
        window.location.href = 'game.html';
    } else {
        alert('Please enter your name.');
    }
});