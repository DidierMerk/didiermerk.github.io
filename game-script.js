document.addEventListener('DOMContentLoaded', function() {
    let playerName = localStorage.getItem('playerName') || 'Player';
    let accountMoney = 0;
    let currentStake = 0;
    let currentStakeWorth = 0;
    let gameActive = false; // Track if the game is active
    let dynamitePositions = new Set(); // To track dynamite positions
    const numChests = 100; // Total number of chests
    let currentRound = 1; // Track the current round
    let clickHistory = [];

    document.getElementById('player-info').style.display = 'block';

    updatePlayerInfo();

    document.getElementById('deposit-button').addEventListener('click', function() {
        document.getElementById('deposit-form').style.display = 'block';
    });

    document.getElementById('deposit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const depositAmount = parseInt(document.getElementById('deposit-amount').value, 10);
        if (depositAmount >= 1 && depositAmount <= 100) {
            accountMoney += depositAmount;
            updatePlayerInfo();
            document.getElementById('deposit-form').style.display = 'none';
            document.getElementById('stake-selection').style.display = 'block';
        }
    });

    document.querySelectorAll('.stake-button').forEach(button => {
        button.addEventListener('click', function() {
            if (gameActive) {
                alert("You're already in a game.");
                return;
            }
            const stake = parseInt(this.getAttribute('data-stake'), 10);
            if (stake <= accountMoney) {
                currentStake = stake;
                currentStakeWorth = stake;
                accountMoney -= stake;
                document.getElementById('starting-stake').textContent = `$${currentStake}`;
                document.getElementById('current-stake-worth').textContent = `$${currentStakeWorth.toFixed(2)}`;
                document.getElementById('cash-out').style.display = 'block';
                updatePlayerInfo();
                toggleStakeButtons(true);
                initializeGame();
                updateGameProgressTable(); // Update game progress table
            } else {
                alert("You don't have enough money for this stake.");
            }
        });
    });

    document.getElementById('cash-out').addEventListener('click', function() {
        accountMoney += currentStakeWorth;
        alert(`You've cashed out $${currentStakeWorth.toFixed(2)}!`);
        currentStake = 0;
        currentStakeWorth = 0;
        gameActive = false;
        currentRound = 1; // Reset to first round
        updatePlayerInfo();
        toggleStakeButtons(false);
        document.getElementById('cash-out').style.display = 'none'; // Hide cash-out button
        resetGame();
        updateGameProgressTable(); // Clear game progress table
    });

    function updatePlayerInfo() {
        document.getElementById('player-details').textContent = `${playerName}, Account Money: $${accountMoney.toFixed(2)}`;
        document.getElementById('stake-selection').style.display = accountMoney > 0 ? 'block' : 'none';
    }

    // function initializeGame() {
    //     gameActive = true;
    //     dynamitePositions.clear();
    //     while(dynamitePositions.size < currentRound) {
    //         dynamitePositions.add(Math.floor(Math.random() * numChests));
    //     }

    //     const chestsContainer = document.getElementById('chests');
    //     chestsContainer.innerHTML = '';
    //     for (let i = 0; i < numChests; i++) {
    //         const chest = document.createElement('button');
    //         chest.textContent = i + 1;
    //         chest.className = 'chest';
    //         if (dynamitePositions.has(i)) {
    //             chest.classList.add('dynamite'); // Dynamite chests
    //         }
    //         chest.onclick = function() { checkChest(i); };
    //         chestsContainer.appendChild(chest);
    //     }
    // }

    function initializeGame() {
        gameActive = true;
        dynamitePositions.clear();
        while(dynamitePositions.size < currentRound) {
            dynamitePositions.add(Math.floor(Math.random() * numChests));
        }

        // Initialize or update the round display here
        document.getElementById('current-round').textContent = currentRound;

        const chestsContainer = document.getElementById('chests');
        chestsContainer.innerHTML = '';
        // Chest initialization code...
        for (let i = 0; i < numChests; i++) {
            const chest = document.createElement('button');
            chest.textContent = i + 1;
            chest.className = 'chest';
            if (dynamitePositions.has(i)) {
                chest.classList.add('dynamite'); // Dynamite chests
            }
            chest.onclick = function() { checkChest(i); };
            chestsContainer.appendChild(chest);
        }
    }

    // function checkChest(index) {
    //     if (!gameActive) return;
    
    //     const isDynamite = dynamitePositions.has(index);
    //     clickHistory.unshift({ chest: index + 1, isDynamite }); // Update history
    //     if (clickHistory.length > 50) {
    //         clickHistory.pop(); // Keep history to last 50 clicks
    //     }
        
    //     if (isDynamite) {
    //         alert('Boom! Game Over.');
    //         // Player hits dynamite, loses everything
    //         currentStake = 0; // Reset current stake
    //         currentStakeWorth = 0; // Reset current stake worth
    //         document.getElementById('starting-stake').textContent = `$${currentStake}`;
    //         document.getElementById('current-stake-worth').textContent = `$${currentStakeWorth.toFixed(2)}`;
    //         document.getElementById('cash-out').style.display = 'none'; // Hide cash-out button
    //         gameActive = false; // Mark game as not active
    //         updateClickHistoryDisplay(); // Refresh the click history display
    //         resetGame(); // Reset the game for a new start
    //     } else {
    //         // Handle case for safe chest
    //         const multiplier = 1 + (currentRound / 100);
    //         currentStakeWorth *= multiplier;
    //         document.getElementById('current-stake-worth').textContent = `$${currentStakeWorth.toFixed(2)}`;
    //         if (currentRound < numChests) currentRound++;
    //         initializeGame(); // Prepare for the next round
    //         updateGameProgressTable(); // Update the game progress table
    //         updateClickHistoryDisplay(); // Update the click history
    //     }
    // }

    function checkChest(index) {
        if (!gameActive) return;
        
        const isDynamite = dynamitePositions.has(index);
        clickHistory.unshift({ chest: index + 1, isDynamite });
        if (clickHistory.length > 50) {
            clickHistory.pop(); // Keep history to last 50 clicks
        }

        if (isDynamite) {
            alert('Boom! Game Over.');
            // Player hits dynamite, loses everything
            currentStake = 0; // Reset current stake
            currentStakeWorth = 0; // Reset current stake worth
            document.getElementById('starting-stake').textContent = `$${currentStake}`;
            document.getElementById('current-stake-worth').textContent = `$${currentStakeWorth.toFixed(2)}`;
            document.getElementById('cash-out').style.display = 'none'; // Hide cash-out button
            gameActive = false; // Mark game as not active
            updateClickHistoryDisplay(); // Refresh the click history display
            resetGame(); // Reset the game for a new start
        } else {
            alert('Safe! You found gold.');
            const multiplier = 1 + (currentRound / 100);
            currentStakeWorth *= multiplier;
            document.getElementById('current-stake-worth').textContent = `$${currentStakeWorth.toFixed(2)}`;
            if (currentRound < numChests) currentRound++;
            document.getElementById('current-round').textContent = currentRound; // Update the round display
            initializeGame(); // Reinitialize for the next round
            updateGameProgressTable();
            updateClickHistoryDisplay();
        }
    }


    // function resetGame() {
    //     // Additional reset operations as needed
    //     gameActive = false;
    //     currentRound = 1;
    //     toggleStakeButtons(false); // Enable stake selection again
    //     const chestsContainer = document.getElementById('chests');
    //     chestsContainer.innerHTML = ''; // Clear the chest area
    //     document.getElementById('stake-selection').style.display = 'block'; // Show stake selection for a new game
    //     updateGameProgressTable(); // Update or clear the game progress table
    // }

    function resetGame() {
        // Reset game code...
        currentRound = 1; // Reset the round to 1
        document.getElementById('current-round').textContent = currentRound; // Reset the round display
        // Other reset operations...
        // Additional reset operations as needed
        gameActive = false;
        currentRound = 1;
        toggleStakeButtons(false); // Enable stake selection again
        const chestsContainer = document.getElementById('chests');
        chestsContainer.innerHTML = ''; // Clear the chest area
        document.getElementById('stake-selection').style.display = 'block'; // Show stake selection for a new game
        updateGameProgressTable(); // Update or clear the game progress table
    }

    function toggleStakeButtons(disabled) {
        document.querySelectorAll('.stake-button').forEach(button => button.disabled = disabled);
    }

    function updateGameProgressTable() {
        const tableBody = document.getElementById('progress-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows
        let futureWinnings = currentStake;
    
        for (let round = 1; round <= 50; round++) {
            const row = tableBody.insertRow(-1);
            row.insertCell(0).textContent = round;
            row.insertCell(1).textContent = `${round}%`;
            futureWinnings *= 1 + round / 100;
            row.insertCell(2).textContent = `$${futureWinnings.toFixed(2)}`;
    
            if (round < currentRound) {
                row.style.backgroundColor = 'lightgreen'; // Rounds before the current one
            } else if (round === currentRound) {
                row.style.backgroundColor = 'lightgray'; // Current round
            }
            // Rows for future rounds will have the default background
        }
    }

    function updateClickHistoryDisplay() {
        const clickListElement = document.getElementById('click-list');
        clickListElement.innerHTML = ''; // Clear current list
    
        clickHistory.forEach((click) => {
            const span = document.createElement('span');
            span.textContent = click.chest;
            span.style.color = click.isDynamite ? 'red' : 'green'; // Red for dynamite, green for money
            clickListElement.appendChild(span);
            clickListElement.appendChild(document.createTextNode(' ')); // Add space between numbers
        });
    }

    updateClickHistoryDisplay();
});