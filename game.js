let round = 1;
let odds = 1;
let startingWager = 0;
let currentWager = 0;
let totalMoneyWagered = 0;
let totalMoneyWon = 0;
let betCount = 0;

document.getElementById('start-game').addEventListener('click', function() {
    let wager = parseFloat(document.getElementById('wager').value);
    if (!wager || !wager.toString().match(/^\d+(\.\d{0,2})?$/) || wager < 1 || wager > 20) {
        alert('Invalid wager amount. Please enter a valid amount with up to two decimal places.');
        return;
    }
    startingWager = wager;
    currentWager = wager;
    totalMoneyWagered += wager;
    betCount++;
    round = 1;
    document.getElementById('betting-history').hidden = true; // Hide during game play
    updateUI();
    document.getElementById('round-overview').hidden = false;
    populateRoundOverview(); // Prepare the round overview table
    updateRoundOverview();
});

document.getElementById('the-button').addEventListener('click', function() {
    currentWager *= (1 + (odds / 100 * 0.99)); // Apply the "House Always Wins" principle here
    odds++;
    round++;
    updateUI();
    updateRoundOverview(); // Update which round has been completed in the overview
    let explosion = Math.random() < (odds / 100);
    if (explosion) {
        alert('The button exploded! Game over.');
        addToHistory(round, startingWager, -startingWager); // Note the loss in history
        resetGame();
    }
});

document.getElementById('cash-out').addEventListener('click', function() {
    totalMoneyWon += currentWager; // Add to total money won immediately upon cashing out
    alert('You have cashed out. Your final wager worth is: $' + currentWager.toFixed(3));
    addToHistory(round, startingWager, currentWager - startingWager); // Record the win
    updateMoneyTracking(); // Immediate update before reset
    resetGame();
});

function updateUI() {
    document.getElementById('wager').hidden = true;
    document.getElementById('start-game').hidden = true;
    document.getElementById('wager-info').hidden = false;
    document.getElementById('the-button').hidden = false;
    document.getElementById('cash-out').hidden = false;
    document.getElementById('starting-wager').innerText = 'The starting wager is: $' + startingWager.toFixed(2);
    document.getElementById('current-wager').innerText = 'Current wager worth is: $' + currentWager.toFixed(2);
    document.getElementById('round-info').innerText = 'Round: ' + round;
    document.getElementById('odds-info').innerText = 'Odds of exploding: ' + odds + '%';
    updateMoneyTracking();
}

function updateMoneyTracking() {
    document.getElementById('total-money-wagered').innerText = 'TOTAL MONEY WAGERED: $' + totalMoneyWagered.toFixed(2);
    document.getElementById('total-money-won').innerText = 'TOTAL MONEY WON: $' + totalMoneyWon.toFixed(2);
    document.getElementById('net-profit').innerText = 'NET PROFIT: $' + (totalMoneyWon - totalMoneyWagered).toFixed(2);
}

function resetGame() {
    document.getElementById('wager').hidden = false;
    document.getElementById('start-game').hidden = false;
    document.getElementById('wager-info').hidden = true;
    document.getElementById('the-button').hidden = true;
    document.getElementById('cash-out').hidden = true;
    document.getElementById('betting-history').hidden = false; // Show again for new wager
    round = 1;
    odds = 1;
    document.getElementById('wager').value = ''; // Clear wager input for next game
    document.getElementById('round-overview').hidden = true;
}

function addToHistory(roundEnded, initialWager, moneyOutcome) {
    let historyTable = document.getElementById('history-table');
    let newRow = historyTable.insertRow(-1);
    let currentTime = new Date().toLocaleTimeString();
    newRow.innerHTML = `<td>${currentTime}</td><td>${betCount}</td><td>$${initialWager.toFixed(2)}</td><td>${roundEnded}</td><td class="${moneyOutcome >= 0 ? 'win' : 'loss'}">$${moneyOutcome.toFixed(2)}</td>`;
}

function populateRoundOverview() {
    let overviewTable = document.getElementById('overview-table');
    // Ensure we start with a clean table each time we populate it
    while (overviewTable.rows.length > 1) {
        overviewTable.deleteRow(1);
    }

    // Assume the wager is the startingWager at the beginning
    let simulatedWager = startingWager;

    for (let i = 1; i <= 50; i++) {
        let newRow = overviewTable.insertRow(-1);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);

        // Fill the table cells
        cell1.innerHTML = i; // Round number
        cell2.innerHTML = i + '%'; // Explosion chance

        // Calculate potential winnings for this round
        if (i > 1) { // For round 1, simulatedWager is already equal to startingWager
            simulatedWager *= ((i - 1) / 100 * 0.99 + 1); // Update simulatedWager for each round, based on the previous round's winnings
        }
        cell3.innerHTML = '$' + simulatedWager.toFixed(2);

        // Note: This loop updates simulatedWager as if the player wins every round
    }
}

function updateRoundOverview() {
    let overviewTable = document.getElementById('overview-table');
    for (let i = 1; i < overviewTable.rows.length; i++) {
        let row = overviewTable.rows[i];
        if (i < round) {
            row.classList.add('passed'); // Mark past rounds as passed
            row.classList.remove('current'); // Ensure it's not marked as current
        } else if (i === round) {
            row.classList.remove('passed'); // Current round is not passed
            row.classList.add('current'); // Mark as current round
        } else {
            row.classList.remove('passed', 'current'); // Future rounds are neither passed nor current
        }
    }
}
