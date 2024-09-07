const gridSizeRows = 7;
const gridSizeCols = 6;
const numberOfPaths = 5;
const minPathLength = 7;
const maxPathLength = 12;

let randomPaths = [];
let selectedPath = [];
let isDragging = false;
let foundPaths = 0;
let validSubgrids = [];
let hintState = {
    pathHints: Array(numberOfPaths).fill(false),
    vocalHints: Array(numberOfPaths).fill(false),
    lastHintType: null
};

// Add these variables at the top of your script
let currentAudio = null;
let audioContext = null;
let audioBuffer = null;
let audioMapping = {};

document.addEventListener('DOMContentLoaded', async () => {
    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', async () => {
        document.getElementById('landing-page').classList.add('hidden');
        document.getElementById('game-page').classList.remove('hidden');
        await initializeGame();
    });

    const dateElement = document.querySelector('.date');
    dateElement.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    adjustCatchphraseSize();
    window.addEventListener('resize', adjustCatchphraseSize);
});

function adjustCatchphraseSize() {
    const catchphrase = document.querySelector('.catchphrase p');
    const gridContainer = document.querySelector('.grid-container');
    let fontSize = 16; // Start with a base font size
    catchphrase.style.fontSize = fontSize + 'px';

    // Keep reducing the font size until the catchphrase fits within the grid container width
    while (catchphrase.scrollWidth > gridContainer.clientWidth && fontSize > 10) {
        fontSize--;
        catchphrase.style.fontSize = fontSize + 'px';
    }
}

function startGame() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    initializeGame();
}

async function initializeGame() {
    await loadAudio();
    regeneratePaths();
    createGrid();
    displayPaths(); // Add this line to display paths for testing
    document.getElementById('hint-button').addEventListener('click', handleHint);
}

function regeneratePaths() {
    let allCellsUsedFlag = false;

    do {
        randomPaths = generateAllPaths();
        validSubgrids = checkSubgrids(randomPaths);
        allCellsUsedFlag = allCellsUsed(randomPaths);
    } while (!allCellsUsedFlag || validSubgrids.length > 0);
}

function generateAllPaths() {
    const grid = Array.from({ length: gridSizeRows }, () => Array(gridSizeCols).fill(null));
    const paths = [];
    const availableCells = [];

    for (let row = 0; row < gridSizeRows; row++) {
        for (let col = 0; col < gridSizeCols; col++) {
            availableCells.push({ row, col });
        }
    }

    for (let i = 0; i < numberOfPaths; i++) {
        let path;
        let retries = 0;
        do {
            path = generateSinglePath(grid, availableCells, i);
            retries++;
        } while (path.length < minPathLength && retries < 100);

        if (retries >= 100) {
            return generateAllPaths();
        }
        paths.push(path);
    }

    return paths;
}

function generateSinglePath(grid, availableCells, pathIndex) {
    const path = [];
    const pathLength = Math.floor(Math.random() * (maxPathLength - minPathLength + 1)) + minPathLength;

    let currentCellIndex = Math.floor(Math.random() * availableCells.length);
    let currentCell = availableCells.splice(currentCellIndex, 1)[0];

    if (!currentCell) {
        return path;
    }

    path.push(currentCell);
    grid[currentCell.row][currentCell.col] = pathIndex;

    for (let i = 1; i < pathLength; i++) {
        const neighbors = getAvailableNeighbors(currentCell, grid);

        if (neighbors.length === 0) {
            break;
        }

        currentCell = neighbors[Math.floor(Math.random() * neighbors.length)];
        path.push(currentCell);
        grid[currentCell.row][currentCell.col] = pathIndex;

        const indexToRemove = availableCells.findIndex(
            (cell) => cell.row === currentCell.row && cell.col === currentCell.col
        );
        if (indexToRemove !== -1) {
            availableCells.splice(indexToRemove, 1);
        }
    }

    return path;
}

function getAvailableNeighbors(cell, grid) {
    const directions = [
        { rowOffset: -1, colOffset: 0 },
        { rowOffset: 1, colOffset: 0 },
        { rowOffset: 0, colOffset: -1 },
        { rowOffset: 0, colOffset: 1 },
        { rowOffset: -1, colOffset: -1 },
        { rowOffset: -1, colOffset: 1 },
        { rowOffset: 1, colOffset: -1 },
        { rowOffset: 1, colOffset: 1 },
    ];

    return directions
        .map(({ rowOffset, colOffset }) => ({
            row: cell.row + rowOffset,
            col: cell.col + colOffset,
        }))
        .filter(
            ({ row, col }) =>
                row >= 0 && row < gridSizeRows && col >= 0 && col < gridSizeCols && grid[row][col] === null
        );
}

function checkSubgrids(paths) {
    const validSubgrids = [];
    
    // Check for all 2x3 subgrids
    for (let row = 0; row < gridSizeRows - 1; row++) {
        for (let col = 0; col < gridSizeCols - 2; col++) {
            const subgrid = [
                { row, col }, { row, col: col + 1 }, { row, col: col + 2 },
                { row: row + 1, col }, { row: row + 1, col: col + 1 }, { row: row + 1, col: col + 2 }
            ];
            const pathIndex = getPathIndex(subgrid[0], paths);
            if (subgrid.every(cell => getPathIndex(cell, paths) === pathIndex)) {
                validSubgrids.push({ topLeft: { row, col }, shape: '2x3' });
            }
        }
    }

    // Check for all 3x2 subgrids
    for (let row = 0; row < gridSizeRows - 2; row++) {
        for (let col = 0; col < gridSizeCols - 1; col++) {
            const subgrid = [
                { row, col }, { row, col: col + 1 },
                { row: row + 1, col }, { row: row + 1, col: col + 1 },
                { row: row + 2, col }, { row: row + 2, col: col + 1 }
            ];
            const pathIndex = getPathIndex(subgrid[0], paths);
            if (subgrid.every(cell => getPathIndex(cell, paths) === pathIndex)) {
                validSubgrids.push({ topLeft: { row, col }, shape: '3x2' });
            }
        }
    }

    return validSubgrids;
}

function getPathIndex(cell, paths) {
    for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
        if (paths[pathIndex].some(c => c.row === cell.row && c.col === cell.col)) {
            return pathIndex;
        }
    }
    return null;
}

function allCellsUsed(paths) {
    const usedCells = paths.flat();
    return usedCells.length === gridSizeRows * gridSizeCols;
}

function createGrid() {
    const gridContainer = document.querySelector('.grid-container');
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';

    for (let row = 0; row < gridSizeRows; row++) {
        for (let col = 0; col < gridSizeCols; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            
            const musicNote = document.createElement('i');
            musicNote.className = 'music-note fas fa-music';
            musicNote.dataset.row = row;
            musicNote.dataset.col = col;
            
            const selectionCircle = document.createElement('div');
            selectionCircle.className = 'selection-circle';
            
            const pathIndex = randomPaths.findIndex((path) =>
                path.some((cell) => cell.row === row && cell.col === col)
            );
            
            cell.appendChild(selectionCircle);
            cell.appendChild(musicNote);
            
            cell.addEventListener('mousedown', (e) => handleCellMouseDown(e, row, col));
            cell.addEventListener('mousemove', (e) => handleCellMouseEnter(e, row, col));
            cell.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleCellMouseDown(e, row, col);
            });
            cell.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const target = document.elementFromPoint(touch.clientX, touch.clientY);
                if (target && target.classList.contains('music-note')) {
                    const row = parseInt(target.dataset.row);
                    const col = parseInt(target.dataset.col);
                    handleCellMouseEnter(e, row, col);
                }
            });
            
            grid.appendChild(cell);
        }
    }

    assignAudioToCells(); // mind this one

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
}

function handleCellMouseDown(e, row, col) {
    if (!isCellInFoundPath(row, col)) {
        isDragging = true;
        selectedPath = [{ row, col }];
        updateSelectedPath();
        playAudioForCell(row, col);  // Add this line
    }
}

function handleCellMouseEnter(e, row, col) {
    if (isDragging && !isCellInFoundPath(row, col)) {
        const existingCellIndex = selectedPath.findIndex((cell) => cell.row === row && cell.col === col);

        if (existingCellIndex !== -1) {
            // If the cell is already in the path, truncate the path to this cell
            selectedPath = selectedPath.slice(0, existingCellIndex + 1);
        } else {
            const lastCell = selectedPath[selectedPath.length - 1];
            if (isAdjacent(lastCell, { row, col })) {
                // Only add the new cell if it's adjacent to the last cell
                selectedPath.push({ row, col });
            }
        }
        updateSelectedPath();
        playAudioForCell(row, col);  // Add this line
    }
}

// Modify the handleMouseUp function
function handleMouseUp() {
    if (isDragging) {
        isDragging = false;
        checkSelectedPath();
        selectedPath = [];
        updateSelectedPath();
        if (currentAudio) {
            currentAudio.stop();
            currentAudio = null;
        }
    }
}

function isAdjacent(cell1, cell2) {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
}

function updateSelectedPath() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => {
        if (!cell.classList.contains('found')) {
            cell.classList.remove('active');
        }
    });

    selectedPath.forEach((cell) => {
        const gridCell = document.querySelector(`.grid-cell:has(.music-note[data-row="${cell.row}"][data-col="${cell.col}"])`);
        if (gridCell && !gridCell.classList.contains('found')) {
            gridCell.classList.add('active');
        }
    });

    updateLinesOverlay();
}

function updateLinesOverlay() {
    const svg = document.querySelector('.lines-overlay');
    svg.innerHTML = '';

    const gridContainer = document.querySelector('.grid-container');
    const rect = gridContainer.getBoundingClientRect();
    const cellWidth = rect.width / gridSizeCols;
    const cellHeight = rect.height / gridSizeRows;

    // Draw found paths
    randomPaths.forEach((path, pathIndex) => {
        if (isPathFound(pathIndex)) {
            drawPath(path, cellWidth, cellHeight, svg, true);
        }
    });

    // Draw current selected path
    drawPath(selectedPath, cellWidth, cellHeight, svg, false);
}

function drawPath(path, cellWidth, cellHeight, svg, isFound) {
    for (let i = 1; i < path.length; i++) {
        const prevCell = path[i - 1];
        const currentCell = path[i];

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const x1 = (prevCell.col + 0.5) * cellWidth;
        const y1 = (prevCell.row + 0.5) * cellHeight;
        const x2 = (currentCell.col + 0.5) * cellWidth;
        const y2 = (currentCell.row + 0.5) * cellHeight;

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', isFound ? '#3182ce' : 'rgb(245, 222, 179)');
        line.setAttribute('stroke-width', '8');
        line.setAttribute('stroke-linecap', 'round');

        if (isFound) {
            line.classList.add('found');
        }

        svg.appendChild(line);
    }
}

function checkSelectedPath() {
    if (selectedPath.length < minPathLength) return;

    const pathIndex = randomPaths.findIndex(path => 
        path.length === selectedPath.length && 
        path.every((cell, index) => 
            cell.row === selectedPath[index].row && 
            cell.col === selectedPath[index].col
        )
    );

    if (pathIndex !== -1 && !isPathFound(pathIndex)) {
        foundPaths++;
        updateProgressText();
        highlightFoundPath(pathIndex);
        
        // Remove hint classes for the found path
        randomPaths[pathIndex].forEach(cell => {
            const gridCell = getCellElement(cell.row, cell.col);
            if (gridCell) {
                gridCell.classList.remove('hint-path-' + pathIndex);
            }
        });
    }
}

function highlightFoundPath(pathIndex) {
    randomPaths[pathIndex].forEach(cell => {
        const gridCell = document.querySelector(`.grid-cell:has(.music-note[data-row="${cell.row}"][data-col="${cell.col}"])`);
        if (gridCell) {
            gridCell.classList.add('found');
            gridCell.classList.remove('hint-path-' + pathIndex);
            
            const musicNote = gridCell.querySelector('.music-note');
            musicNote.classList.add(`path-${pathIndex}`);
            musicNote.classList.remove('fa-microphone', 'hint-vocal');
            musicNote.classList.add('fa-music');
        }
    });
    updateLinesOverlay();
}

function updateProgressText() {
    const progressText = document.querySelector('.progress-text');
    progressText.textContent = `${foundPaths} of 5 songs found`;

    if (foundPaths === numberOfPaths) {
        setTimeout(() => {
            alert('Congratulations! You found all the songs!');
        }, 500);
    }
}

function handleHint() {
    if (foundPaths < numberOfPaths) {
        const nextHint = getNextHint();
        if (nextHint) {
            if (nextHint.type === 'path') {
                givePathHint(nextHint.pathIndex);
            } else {
                giveVocalHint(nextHint.pathIndex);
            }
            
            // Check if this was the last hint
            if (getNextHint() === null) {
                changeToGiveUpButton();
            }
        } else {
            changeToGiveUpButton();
        }
    } else {
        alert('You have already found all the songs!');
    }
}

function changeToGiveUpButton() {
    const hintButton = document.getElementById('hint-button');
    hintButton.textContent = 'Give Up';
    hintButton.classList.add('give-up');
    hintButton.removeEventListener('click', handleHint);
    hintButton.addEventListener('click', handleGiveUp);
}

function getNextHint() {
    for (let pathIndex = 0; pathIndex < numberOfPaths; pathIndex++) {
        if (!isPathFound(pathIndex)) {
            if (!hintState.pathHints[pathIndex]) {
                return { type: 'path', pathIndex: pathIndex };
            } else if (!hintState.vocalHints[pathIndex]) {
                return { type: 'vocal', pathIndex: pathIndex };
            }
        }
    }
    return null; // No more hints available
}

function givePathHint(pathIndex) {
    hintState.pathHints[pathIndex] = true;
    hintState.lastHintType = 'path';
    
    randomPaths[pathIndex].forEach(cell => {
        const gridCell = getCellElement(cell.row, cell.col);
        if (gridCell) {
            gridCell.classList.add('hint-path-' + pathIndex);
        }
    });
}

function giveVocalHint(pathIndex) {
    hintState.vocalHints[pathIndex] = true;
    hintState.lastHintType = 'vocal';
    
    randomPaths[pathIndex].forEach(cell => {
        const musicNote = document.querySelector(`.music-note[data-row="${cell.row}"][data-col="${cell.col}"]`);
        if (musicNote) {
            musicNote.classList.remove('fa-music');
            musicNote.classList.add('fa-microphone', 'hint-vocal');
        }
    });
}

function handleGiveUp() {
    // Implement the give up functionality here
    alert('Game over! Better luck next time!');
    // You might want to reveal all paths or restart the game
}

function isPathFound(pathIndex) {
    return randomPaths[pathIndex].every(cell => {
        const gridCell = document.querySelector(`.grid-cell:has(.music-note[data-row="${cell.row}"][data-col="${cell.col}"])`);
        return gridCell && gridCell.classList.contains('found');
    });
}

function isCellInFoundPath(row, col) {
    const gridCell = document.querySelector(`.grid-cell:has(.music-note[data-row="${row}"][data-col="${col}"])`);
    return gridCell && gridCell.classList.contains('found');
}

function displayPaths() {
    const pathList = document.getElementById('path-list');
    let pathsText = '';
    randomPaths.forEach((path, index) => {
        pathsText += `Path ${index + 1}: `;
        path.forEach((cell, cellIndex) => {
            pathsText += `(${cell.row},${cell.col})`;
            if (cellIndex < path.length - 1) {
                pathsText += ' -> ';
            }
        });
        pathsText += '\n';
    });
    pathList.textContent = pathsText;
}

function handleResize() {
    updateLinesOverlay();
    adjustCatchphraseSize();
}

window.addEventListener('resize', handleResize);

// Helper function to get the cell element at a specific row and column
function getCellElement(row, col) {
    return document.querySelector(`.grid-cell:has(.music-note[data-row="${row}"][data-col="${col}"])`);
}

// Update the handleCellMouseEnter function to allow revisiting cells and deleting the path after the highlighted cell
function handleCellMouseEnter(e, row, col) {
    if (isDragging && !isCellInFoundPath(row, col)) {
        const lastCell = selectedPath[selectedPath.length - 1];
        if (isAdjacent(lastCell, { row, col })) {
            const existingCellIndex = selectedPath.findIndex((cell) => cell.row === row && cell.col === col);
            if (existingCellIndex !== -1) {
                // If the cell is already in the path, truncate the path to this cell
                selectedPath = selectedPath.slice(0, existingCellIndex + 1);
            } else {
                // Only add the new cell if it's adjacent to the last cell
                selectedPath.push({ row, col });
            }
            updateSelectedPath();
        }
    }
}

// Update the isAdjacent function to allow for easier diagonal movements
function isAdjacent(cell1, cell2) {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
}

// Update the updateSelectedPath function to handle the new cell highlighting logic
function updateSelectedPath() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach((cell) => {
        if (!cell.classList.contains('found')) {
            cell.classList.remove('active');
        }
    });

    selectedPath.forEach((cell, index) => {
        const gridCell = getCellElement(cell.row, cell.col);
        if (gridCell && !gridCell.classList.contains('found')) {
            gridCell.classList.add('active');
            // Add a data attribute to store the index in the path
            gridCell.dataset.pathIndex = index;
        }
    });

    updateLinesOverlay();
}

// Update the drawPath function to allow for curved lines for diagonal movements
function drawPath(path, cellWidth, cellHeight, svg, isFound) {
    for (let i = 1; i < path.length; i++) {
        const prevCell = path[i - 1];
        const currentCell = path[i];

        const x1 = (prevCell.col + 0.5) * cellWidth;
        const y1 = (prevCell.row + 0.5) * cellHeight;
        const x2 = (currentCell.col + 0.5) * cellWidth;
        const y2 = (currentCell.row + 0.5) * cellHeight;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > Math.min(cellWidth, cellHeight) * 1.5) {
            // For diagonal movements, use a quadratic curve
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const controlX = midX - dy * 0.25;
            const controlY = midY + dx * 0.25;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', isFound ? '#3182ce' : 'rgb(245, 222, 179)');
            path.setAttribute('stroke-width', '8');
            path.setAttribute('stroke-linecap', 'round');

            if (isFound) {
                path.classList.add('found');
            }

            svg.appendChild(path);
        } else {
            // For adjacent cells, use a straight line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', isFound ? '#3182ce' : 'rgb(245, 222, 179)');
            line.setAttribute('stroke-width', '8');
            line.setAttribute('stroke-linecap', 'round');

            if (isFound) {
                line.classList.add('found');
            }

            svg.appendChild(line);
        }
    }
}

// new attempt

// Add this function to load the audio file
async function loadAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await fetch('tracks/track0.mp3');
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

// Modify the assignAudioToCells function
function assignAudioToCells() {
    const path0 = randomPaths[0];
    path0.forEach((cell, index) => {
        if (index < audioBuffer.duration) {
            audioMapping[`${cell.row},${cell.col}`] = index;
        }
    });
}

function playAudioFragment(startTime) {
    if (currentAudio) {
        currentAudio.stop();
    }
    currentAudio = audioContext.createBufferSource();
    currentAudio.buffer = audioBuffer;
    currentAudio.connect(audioContext.destination);
    currentAudio.start(0, startTime, 1); // Play 1 second starting from startTime
}

// Modify the playAudioForCell function
function playAudioForCell(row, col) {
    const cellKey = `${row},${col}`;
    const startTime = audioMapping[cellKey];
    
    if (startTime !== undefined) {
        playAudioFragment(startTime);
    }
}

// end new attempt





// mind this one



