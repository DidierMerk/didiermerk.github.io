document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Constants for grid and path generation
    const gridSizeRows = 7;
    const gridSizeCols = 6;
    const numberOfPaths = 5;
    const minPathLength = 7;
    const maxPathLength = 12;

    let randomPaths = [];
    let foundPaths = 0;
    let solutionPaths = [];

    // For the modal
    let userGaveUp = false;
    let hintsUsed = 0; // Track the number of hints used
    let gameProgress = []; // Track the progress of the game

    const progressEmojis = {
        path0: '🟣',
        path1: '🟠',
        path2: '🔵',
        path3: '🟡',
        path4: '🟢',
        pathHint: '💡',
        vocalHint: '🎤',
        giveUp: '❌'
    };

    // Play button functionality
    const playButton = document.getElementById('play-button');
    const gameInfo = document.querySelector('.game-info');
    const gameContent = document.querySelector('.game-content');
    const footer = document.querySelector('footer');
    const slogan = document.querySelector('.slogan');
    const gridContainer = document.querySelector('.grid-container');

    function addNoteSelectionFunctionality() {
        //  empty for now
    }

    function updateScoreCounter() {
        const scoreCounter = document.querySelector('.score-counter');
        scoreCounter.innerHTML = `<strong>${foundPaths}</strong> of <strong>5</strong> songs found`;
    }

    function generateGrid() {
        gridContainer.innerHTML = '';
        const solution = generateSolution();
        randomPaths = solution.grid;
        solutionPaths = solution.paths;
        for (let i = 0; i < 42; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.classList.add(`path-${randomPaths[i]}`);
            gridContainer.appendChild(cell);
        }
        adjustGridLayout();
        addNoteSelectionFunctionality();
        addTouchDragFunctionality();
        displayPaths();
        updateScoreCounter();

        // Reset hint state
        hintState = Array(numberOfPaths).fill().map(() => ({ pathHint: false, vocalHint: false }));
        updateHintButton();
    }

    function checkPath(selectedPath) {
        const selectedIndices = selectedPath.map(cell => cell.row * gridSizeCols + cell.col);
        return solutionPaths.findIndex(path => arraysEqual(selectedIndices, path));
    }

    function arraysEqual(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    }

    function generateSolution() {
        let grid, paths;
        do {
            grid = new Array(42).fill(-1);
            paths = [];
            for (let i = 0; i < numberOfPaths; i++) {
                const path = generatePath(grid, i);
                if (path) paths.push(path);
                else break;
            }
        } while (paths.length < numberOfPaths || !allCellsUsed(grid) || hasInvalidSubgrids(grid));
        return { grid, paths };
    }

    function generatePath(grid, pathIndex) {
        let path = [];
        let currentCell = getRandomUnusedCell(grid);
        let length = Math.floor(Math.random() * (maxPathLength - minPathLength + 1)) + minPathLength;
    
        while (path.length < length) {
            if (currentCell === null) break;
            grid[currentCell] = pathIndex;
            path.push(currentCell);
            currentCell = getRandomAdjacentUnusedCell(grid, currentCell);
        }
    
        return path.length >= minPathLength ? path : null;
    }

    function getRandomUnusedCell(grid) {
        const unusedCells = grid.reduce((acc, cell, index) => cell === -1 ? [...acc, index] : acc, []);
        return unusedCells.length > 0 ? unusedCells[Math.floor(Math.random() * unusedCells.length)] : null;
    }

    function getRandomAdjacentUnusedCell(grid, cell) {
        const adjacentCells = getAdjacentCells(cell);
        const unusedAdjacentCells = adjacentCells.filter(c => grid[c] === -1);
        return unusedAdjacentCells.length > 0 ? unusedAdjacentCells[Math.floor(Math.random() * unusedAdjacentCells.length)] : null;
    }

    function getAdjacentCells(cell) {
        const row = Math.floor(cell / gridSizeCols);
        const col = cell % gridSizeCols;
        const adjacentCells = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < gridSizeRows && newCol >= 0 && newCol < gridSizeCols) {
                    adjacentCells.push(newRow * gridSizeCols + newCol);
                }
            }
        }

        return adjacentCells;
    }

    function allCellsUsed(grid) {
        return grid.every(cell => cell !== -1);
    }

    function hasInvalidSubgrids(grid) {
        // Check for 2x3 subgrids
        for (let row = 0; row < gridSizeRows - 1; row++) {
            for (let col = 0; col < gridSizeCols - 2; col++) {
                const subgrid = [
                    grid[row * gridSizeCols + col], grid[row * gridSizeCols + col + 1], grid[row * gridSizeCols + col + 2],
                    grid[(row + 1) * gridSizeCols + col], grid[(row + 1) * gridSizeCols + col + 1], grid[(row + 1) * gridSizeCols + col + 2]
                ];
                if (subgrid.every(cell => cell === subgrid[0] && cell !== -1)) {
                    return true;
                }
            }
        }
    
        // Check for 3x2 subgrids
        for (let row = 0; row < gridSizeRows - 2; row++) {
            for (let col = 0; col < gridSizeCols - 1; col++) {
                const subgrid = [
                    grid[row * gridSizeCols + col], grid[row * gridSizeCols + col + 1],
                    grid[(row + 1) * gridSizeCols + col], grid[(row + 1) * gridSizeCols + col + 1],
                    grid[(row + 2) * gridSizeCols + col], grid[(row + 2) * gridSizeCols + col + 1]
                ];
                if (subgrid.every(cell => cell === subgrid[0] && cell !== -1)) {
                    return true;
                }
            }
        }
    
        return false;
    }

    function adjustGridLayout() {
        const containerWidth = gridContainer.offsetWidth;
        const containerHeight = gridContainer.offsetHeight;
        const cols = 6;
        const rows = 7;
        const scalingFactor = 0.85; // Adjust this value to change cell size (0.9 = 90% of max size)

        // Calculate cell size (diameter) based on the smaller dimension
        const maxCellSize = Math.min(containerWidth / cols, containerHeight / rows);
        const cellSize = maxCellSize * scalingFactor;

        // Calculate gaps
        const horizontalGap = (containerWidth - cellSize * cols) / (cols - 1);
        const verticalGap = (containerHeight - cellSize * rows) / (rows - 1);

        // Apply styles to grid container
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
        gridContainer.style.columnGap = `${horizontalGap}px`;
        gridContainer.style.rowGap = `${verticalGap}px`;

        // Apply size to cells
        const cells = gridContainer.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
        });
    }

    if (playButton) {
        playButton.addEventListener('click', function() {
            if (gameInfo) gameInfo.style.display = 'none';
            if (gameContent) gameContent.style.display = 'flex';
            // if (footer) footer.style.visibility = 'hidden';
            if (slogan) slogan.style.display = 'block';
            generateGrid();
            adjustSloganFontSize();
        });
    }

    // Adjust grid layout on window resize
    window.addEventListener('resize', adjustGridLayout);

    function addTouchDragFunctionality() {
        let isSelecting = false;
        let isDragging = false;
        let selectedPath = [];
        let svg = null;
    
        function isAdjacent(cell1, cell2) {
            const rowDiff = Math.abs(cell1.row - cell2.row);
            const colDiff = Math.abs(cell1.col - cell2.col);
            return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
        }
    
        function getCellCoords(cell) {
            const index = Array.from(gridContainer.children).indexOf(cell);
            return { col: index % 6, row: Math.floor(index / 6) };
        }
    
        function handleDrag(cell) {
            if (cell.classList.contains('found')) return;
            const newCell = getCellCoords(cell);
            if (selectedPath.length === 0 || isAdjacent(selectedPath[selectedPath.length - 1], newCell)) {
                const existingIndex = selectedPath.findIndex(c => c.row === newCell.row && c.col === newCell.col);
                if (existingIndex !== -1) {
                    selectedPath = selectedPath.slice(0, existingIndex + 1);
                } else {
                    selectedPath.push(newCell);
                }
                updateCellSelection();
                updateLines();
            }
        }
    
        function handleClick(cell) {
            if (cell.classList.contains('found')) return;

            const newCell = getCellCoords(cell);
            if (selectedPath.length === 0) {
                selectedPath = [newCell];
            } else if (selectedPath.length === 1 && selectedPath[0].row === newCell.row && selectedPath[0].col === newCell.col) {
                selectedPath = []; // Deselect if clicking on the only selected cell
            } else {
                const lastCell = selectedPath[selectedPath.length - 1];
                const existingIndex = selectedPath.findIndex(c => c.row === newCell.row && c.col === newCell.col);
                if (existingIndex !== -1) {
                    selectedPath = selectedPath.slice(0, existingIndex + 1);
                } else if (isAdjacent(lastCell, newCell)) {
                    selectedPath.push(newCell);
                } else {
                    selectedPath = [newCell]; // Start new path if not adjacent
                }
            }
            updateCellSelection();
            updateLines();
        }
    
        function updateCellSelection() {
            const cells = gridContainer.querySelectorAll('.grid-cell');
            cells.forEach((cell, index) => {
                const col = index % 6;
                const row = Math.floor(index / 6);
                if (selectedPath.some(c => c.row === row && c.col === col)) {
                    cell.classList.add('selected');
                } else {
                    cell.classList.remove('selected');
                }
            });
        }
    
        function updateLines(permanent = false) {
            if (!svg) {
                svg = createSVGOverlay();
            }
            if (!permanent) {
                // Remove only temporary lines
                svg.querySelectorAll('line:not(.permanent)').forEach(line => line.remove());
            }
        
            const gridRect = gridContainer.getBoundingClientRect();
        
            const pathToUpdate = updateAll ? solutionPaths : [selectedPath];
    
            pathToUpdate.forEach((path, index) => {
                if (path) {
                    for (let i = 1; i < path.length; i++) {
                        const start = updateAll ? 
                            { row: Math.floor(path[i-1] / gridSizeCols), col: path[i-1] % gridSizeCols } :
                            path[i-1];
                        const end = updateAll ? 
                            { row: Math.floor(path[i] / gridSizeCols), col: path[i] % gridSizeCols } :
                            path[i];

                        const startCell = gridContainer.children[start.row * gridSizeCols + start.col];
                        const endCell = gridContainer.children[end.row * gridSizeCols + end.col];
                        const startRect = startCell.getBoundingClientRect();
                        const endRect = endCell.getBoundingClientRect();

                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', startRect.left - gridRect.left + startRect.width / 2);
                        line.setAttribute('y1', startRect.top - gridRect.top + startRect.height / 2);
                        line.setAttribute('x2', endRect.left - gridRect.left + endRect.width / 2);
                        line.setAttribute('y2', endRect.top - gridRect.top + endRect.height / 2);
                        line.setAttribute('stroke', updateAll ? '#aedfee' : '#dbd8c5');
                        line.setAttribute('stroke-width', '1.3vh');
                        line.setAttribute('stroke-linecap', 'round');

                        if (updateAll) {
                            line.classList.add('permanent');
                        }

                        svg.appendChild(line);
                    }
                }
            });
        }
    
        function createSVGOverlay() {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.pointerEvents = 'none';
            gridContainer.appendChild(svg);
            return svg;
        }
    
        function handleStart(e) {
            isSelecting = true;
            isDragging = false;
            const cell = e.target.closest('.grid-cell');
            if (cell) {
                handleDrag(cell);
            }
        }
    
        function handleMove(e) {
            if (!isSelecting) return;
            isDragging = true;
            
            let cell;
            if (e.type.startsWith('mouse')) {
                cell = e.target.closest('.grid-cell');
            } else if (e.type.startsWith('touch')) {
                const touch = e.touches[0];
                cell = document.elementFromPoint(touch.clientX, touch.clientY);
            }
    
            if (cell && cell.classList.contains('grid-cell')) {
                handleDrag(cell);
            }
        }
    
        function handleEnd() {
            if (isDragging) {
                const pathIndex = checkPath(selectedPath);
                if (pathIndex !== -1 && !isPathFound(pathIndex)) {
                    markPathAsFound(pathIndex);
                    // foundPaths++;
                    updateScoreCounter();
                }
                selectedPath = [];
                updateCellSelection();
                updateLines();
            }
            isSelecting = false;
            isDragging = false;
        }

        function markPathAsFound(pathIndex) {
            const path = solutionPaths[pathIndex];
            path.forEach(cellIndex => {
                const cell = gridContainer.children[cellIndex];
                cell.classList.add('found');
                cell.classList.remove('selected', 'path-hint', 'vocal-hint');
            });
            
            // Update the permanent line for the found path immediately
            const svg = document.querySelector('.grid-container svg') || createSVGOverlay();
            const gridRect = gridContainer.getBoundingClientRect();
        
            for (let i = 1; i < path.length; i++) {
                const start = { row: Math.floor(path[i-1] / gridSizeCols), col: path[i-1] % gridSizeCols };
                const end = { row: Math.floor(path[i] / gridSizeCols), col: path[i] % gridSizeCols };
        
                const startCell = gridContainer.children[start.row * gridSizeCols + start.col];
                const endCell = gridContainer.children[end.row * gridSizeCols + end.col];
                const startRect = startCell.getBoundingClientRect();
                const endRect = endCell.getBoundingClientRect();
        
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', startRect.left - gridRect.left + startRect.width / 2);
                line.setAttribute('y1', startRect.top - gridRect.top + startRect.height / 2);
                line.setAttribute('x2', endRect.left - gridRect.left + endRect.width / 2);
                line.setAttribute('y2', endRect.top - gridRect.top + endRect.height / 2);
                line.setAttribute('stroke', '#aedfee');
                line.setAttribute('stroke-width', '1.3vh');
                line.setAttribute('stroke-linecap', 'round');
                line.classList.add('permanent');
        
                svg.appendChild(line);
            }
        
            // Remove hint classes when a path is found
            path.forEach(cellIndex => {
                const cell = gridContainer.children[cellIndex];
                cell.classList.remove('path-hint', 'vocal-hint');
            });
            
            // Reset hint state for the found path
            hintState[pathIndex] = { pathHint: false, vocalHint: false };
        
            foundPaths++;
        
            if (foundPaths === numberOfPaths) {
                hintButton.textContent = 'Results';
                hintButton.classList.remove('give-up');
                hintButton.classList.add('results');
                animateGridCompletion();
            } else if (areAllHintsGiven()) {
                hintButton.textContent = 'Give Up';
                hintButton.classList.add('give-up');
            } else {
                updateHintButton();
            }
            
            // Add finding a path to the game progress
            gameProgress.push(progressEmojis[`path${pathIndex}`]);
        
            // Update the score counter
            updateScoreCounter();
        }
        
        // Mouse events
        gridContainer.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
    
        // Touch events
        gridContainer.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
    
        // Click event for non-drag selection
        gridContainer.addEventListener('click', (e) => {
            if (!isDragging) {
                const cell = e.target.closest('.grid-cell');
                if (cell) {
                    handleClick(cell);
                }
            }
        });
    
        // Prevent default touch behavior to avoid scrolling
        gridContainer.addEventListener('touchstart', (e) => e.preventDefault());
        gridContainer.addEventListener('touchmove', (e) => e.preventDefault());
    }
    
    // Function to adjust slogan font size
    function adjustSloganFontSize() {
        const sloganElement = document.querySelector('.slogan');
        if (sloganElement) {
            const containerWidth = sloganElement.offsetWidth;
            let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

            sloganElement.style.fontSize = fontSize + 'px';

            while (sloganElement.scrollWidth > containerWidth && fontSize > fontSize * 0.5) {
                fontSize *= 0.95;
                sloganElement.style.fontSize = fontSize + 'px';
            }
        }
    }

    // Adjust slogan font size on window resize
    window.addEventListener('resize', adjustSloganFontSize);

    // Prevent scrolling on iOS when tapping the header
    const header = document.querySelector('header');
    if (header) {
        header.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
    }

    function displayPaths() {
        console.log("Generated Paths:");
        solutionPaths.forEach((path, index) => {
            console.log(`Path ${index + 1}: ${path.join(' -> ')}`);
        });
    }

    function isPathFound(pathIndex) {
        return solutionPaths[pathIndex].every(cellIndex => 
            gridContainer.children[cellIndex].classList.contains('found')
        );
    }

    // Hint functionality
    const hintButton = document.getElementById('hint-button');
    let hintState = Array(numberOfPaths).fill().map(() => ({ pathHint: false, vocalHint: false }));

    function handleHint() {
        if (foundPaths === numberOfPaths) {
            showModal();
            return;
        }
    
        const undiscoveredPaths = solutionPaths.reduce((acc, path, index) => {
            if (!isPathFound(index)) {
                acc.push({ path, index });
            }
            return acc;
        }, []);
        
        if (undiscoveredPaths.length === 0) {
            console.log("All paths discovered!");
            hintButton.textContent = 'Results';
            hintButton.classList.remove('give-up');
            hintButton.classList.add('results');
            hintButton.disabled = false;
            return;
        }
    
        // Find the next path that needs a hint
        const nextHintPath = undiscoveredPaths.find(({ index }) => !hintState[index].pathHint || !hintState[index].vocalHint);
    
        if (!nextHintPath) {
            if (!hintButton.classList.contains('results')) {
                hintButton.textContent = 'Give Up';
                hintButton.classList.add('give-up');
            }
            return;
        }
    
        const { path, index: pathIndex } = nextHintPath;
    
        if (!hintState[pathIndex].pathHint) {
            showPathHint(path, pathIndex);
            hintState[pathIndex].pathHint = true;
            gameProgress.push(progressEmojis.pathHint);
        } else {
            showVocalHint(path, pathIndex);
            hintState[pathIndex].vocalHint = true;
            gameProgress.push(progressEmojis.vocalHint);
        }

        hintsUsed++; // Increment the hint counter
    
        if (areAllHintsGiven()) {
            hintButton.textContent = 'Give Up';
            hintButton.classList.add('give-up');
        } else {
            updateHintButton();
        }
    }
    

    function showPathHint(path, pathIndex) {
        // Only remove hints for cells that are not part of any previously hinted paths
        gridContainer.querySelectorAll('.grid-cell').forEach(cell => {
            if (!cell.classList.contains('path-hint') && !cell.classList.contains('vocal-hint')) {
                cell.classList.remove('path-hint', 'vocal-hint');
            }
        });

        path.forEach(cellIndex => {
            const cell = gridContainer.children[cellIndex];
            cell.classList.add('path-hint', `path-${pathIndex}`);
        });
    }

    function showVocalHint(path, pathIndex) {
        path.forEach(cellIndex => {
            const cell = gridContainer.children[cellIndex];
            cell.classList.add('vocal-hint');
        });
    }

    function updateHintButton() {
        const undiscoveredPaths = solutionPaths.filter((_, index) => !isPathFound(index));
        
        if (undiscoveredPaths.length === 0) {
            hintButton.textContent = 'All Found!';
            hintButton.disabled = true;
        } else if (areAllHintsGiven()) {
            hintButton.textContent = 'Give Up';
            hintButton.classList.add('give-up');
        } else {
            hintButton.textContent = 'Hint';
            hintButton.classList.remove('give-up');
        }
    }

    function areAllHintsGiven() {
        return solutionPaths.every((_, index) => 
            isPathFound(index) || (hintState[index].pathHint && hintState[index].vocalHint)
        );
    }

    // Add this function to reset hints when starting a new game
    function resetHints() {
        gridContainer.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('path-hint', 'vocal-hint');
        });
    }

    function showModal() {
        const modal = document.getElementById('game-end-modal');
        const modalTitle = document.querySelector('.modal-title');
        const congratulationsText = document.querySelector('.congratulations');
    
        modal.style.display = 'flex';
        
        if (userGaveUp) {
            // User gave up: show how many songs they found
            modalTitle.textContent = 'Great attempt!';
            congratulationsText.innerHTML = `You found <strong>${foundPaths}</strong> out of <strong>5</strong> songs. Will you find them all tomorrow?`;
        } else {
            // User found all paths: show how many hints were used
            modalTitle.textContent = 'Well Done!';
            congratulationsText.innerHTML = `You found all <strong>5</strong> songs and only used <strong>${hintsUsed}</strong> hints. Great job!`;
        }

        // Show the progress of the game
        displayGameProgress();
    
        // Set current date
        const currentDateElement = document.getElementById('current-date');
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = new Date().toLocaleDateString('en-US', options);
        
        // Start countdown timer
        startCountdownTimer();

    }
    
    function closeModal() {
        const modal = document.getElementById('game-end-modal');
        modal.style.display = 'none';
    }

    function startCountdownTimer() {
        const countdownElement = document.getElementById('countdown-timer');
        
        function updateCountdown() {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const difference = tomorrow - now;
            
            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Add close functionality to the modal's close button and "back to puzzle" text
    const closeButton = document.querySelector('.modal-content .close');
    const backToPuzzle = document.querySelector('.modal-content .back-to-puzzle');
    closeButton.addEventListener('click', closeModal);
    backToPuzzle.addEventListener('click', closeModal);

    // Close the modal if user clicks outside the content
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('game-end-modal');
        if (event.target == modal) {
            closeModal();
        }
    });

    function animateGridCompletion() {
        const cells = document.querySelectorAll('.grid-cell');
        const rows = 7;
        const cols = 6;
        let delay = 0;
    
        // Diagonal pulse animation
        for (let sum = 0; sum < rows + cols - 1; sum++) {
            for (let i = 0; i < rows; i++) {
                const j = sum - i;
                if (j >= 0 && j < cols) {
                    const index = i * cols + j;
                    setTimeout(() => {
                        cells[index].classList.add('pulse-animate');
                        cells[index].addEventListener('animationend', () => {
                            cells[index].classList.remove('pulse-animate');
                        }, { once: true });
                    }, delay * 30); // Changed from 50 to 30 for faster animation
                    delay++;
                }
            }
        }
    
        // Final pulse animation for all cells
        setTimeout(() => {
            cells.forEach(cell => {
                cell.classList.add('final-pulse');
                cell.addEventListener('animationend', () => {
                    cell.classList.remove('final-pulse');
                }, { once: true });
            });
        }, delay * 30 + 100); // Add a small delay after the diagonal animation
    
        // Open modal after all animations complete
        setTimeout(showModal, delay * 30 + 600);

    }

    function createSVGOverlay() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        gridContainer.appendChild(svg);
        return svg;
    }

    function handleGiveUp() {
        userGaveUp = true;  // Set flag to true when the user gives up
        gameProgress.push(progressEmojis.giveUp); // add giving up to the game progress

        // Disable the hint button to prevent multiple clicks
        hintButton.disabled = true;
    
        const undiscoveredPaths = solutionPaths.filter((_, index) => !isPathFound(index));
        let delay = 0;
    
        undiscoveredPaths.forEach((path, index) => {
            setTimeout(() => {
                revealPath(path, index);
            }, delay * 500); // 500ms delay between each path reveal
            delay++;
        });
    
        // Change button text and class, and show modal after all animations complete
        setTimeout(() => {
            hintButton.textContent = 'Results';
            hintButton.classList.remove('give-up');
            hintButton.classList.add('results');
            hintButton.disabled = false;
            showModal();
        }, delay * 500);
    }
    
    function revealPath(path, pathIndex) {
        // Reveal cells
        path.forEach((cellIndex) => {
            const cell = gridContainer.children[cellIndex];
            cell.classList.add('found', `path-${pathIndex}`, 'reveal-animate');
            cell.classList.remove('path-hint', 'vocal-hint'); // Remove hint classes
            cell.addEventListener('animationend', () => {
                cell.classList.remove('reveal-animate');
            }, { once: true });
        });
    
        // Draw lines
        for (let i = 1; i < path.length; i++) {
            createLine(path[i-1], path[i], pathIndex);
        }
    }
    
    function createLine(startIndex, endIndex, pathIndex) {
        const svg = document.querySelector('.grid-container svg') || createSVGOverlay();
        const gridRect = gridContainer.getBoundingClientRect();
    
        const startCell = gridContainer.children[startIndex];
        const endCell = gridContainer.children[endIndex];
        const startRect = startCell.getBoundingClientRect();
        const endRect = endCell.getBoundingClientRect();
    
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startRect.left - gridRect.left + startRect.width / 2);
        line.setAttribute('y1', startRect.top - gridRect.top + startRect.height / 2);
        line.setAttribute('x2', endRect.left - gridRect.left + endRect.width / 2);
        line.setAttribute('y2', endRect.top - gridRect.top + endRect.height / 2);
        line.setAttribute('stroke', '#aedfee');
        line.setAttribute('stroke-width', '1.3vh');
        line.setAttribute('stroke-linecap', 'round');
        line.classList.add('permanent', 'reveal-animate');
    
        svg.appendChild(line);
    }
    
    function createSVGOverlay() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        gridContainer.appendChild(svg);
        return svg;
    }

    function displayGameProgress() {
        const resultSquare = document.querySelector('.result-square');
        resultSquare.innerHTML = '';
        resultSquare.style.position = 'relative';
        resultSquare.style.width = '100%';
        resultSquare.style.aspectRatio = '1 / 1';
        resultSquare.style.backgroundColor = '#ffffff';
    
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
    
        const pathGroup = document.createElementNS(svgNS, "g");
        const emojiGroup = document.createElementNS(svgNS, "g");
    
        const cols = 5;
        const totalWidth = 100 - 2 * 8; // Use your original padding of 8 here

        const baseUnitWidth = totalWidth / (cols + (cols - 1) * 0.4); // 0.4 is the ratio of spacing to cell size
        const cellSize = baseUnitWidth
        
        const horizontalSpacing = cellSize * 0.75;
        const horizontalPadding = (100 - (cellSize * cols + horizontalSpacing * (cols - 1))) / 2;
        
        const verticalSpacing = cellSize * 1.2; // Increased vertical spacing
        
    
        // Calculate the number of rows based on gameProgress length
        const rows = Math.ceil(gameProgress.length / cols);
    
        // Calculate total height of the path
        const totalPathHeight = rows * cellSize + (rows - 1) * verticalSpacing;
        
        // Calculate vertical padding to center the path
        const verticalPadding = (100 - totalPathHeight) / 2;
    
        let path = "";
    
        gameProgress.forEach((emoji, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
    
            const x = (row % 2 === 0) 
                ? (horizontalPadding + col * (cellSize + horizontalSpacing) + cellSize/2) 
                : (horizontalPadding + (cols - 1 - col) * (cellSize + horizontalSpacing) + cellSize/2);
            const y = verticalPadding + row * (cellSize + verticalSpacing) + cellSize/2;
    
            // Add line to the path
            if (index === 0) {
                path = `M ${x},${y} `;
            } else {
                path += `L ${x},${y} `;
            }
    
            // Add emoji
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", x);
            text.setAttribute("y", y);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "central");
            text.setAttribute("font-size", `${cellSize * 0.16}vh`);
            text.textContent = emoji;
            emojiGroup.appendChild(text);
        });
    
        // Create the path element
        const pathElement = document.createElementNS(svgNS, "path");
        pathElement.setAttribute("d", path);
        pathElement.setAttribute("fill", "none");
        pathElement.setAttribute("stroke", "#aedfee");
        pathElement.setAttribute("stroke-width", `${cellSize * 0.5}`);
        pathElement.setAttribute("stroke-linecap", "round");
        pathElement.setAttribute("stroke-linejoin", "round");
    
        // Add drop shadow
        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "drop-shadow");
        const feDropShadow = document.createElementNS(svgNS, "feDropShadow");
        feDropShadow.setAttribute("dx", "0");
        feDropShadow.setAttribute("dy", "1");
        feDropShadow.setAttribute("stdDeviation", "2");
        feDropShadow.setAttribute("flood-color", "rgba(0,0,0,0.3)");
        filter.appendChild(feDropShadow);
        svg.appendChild(filter);
    
        pathElement.setAttribute("filter", "url(#drop-shadow)");
    
        pathGroup.appendChild(pathElement);
        svg.appendChild(pathGroup);
        svg.appendChild(emojiGroup);
        resultSquare.appendChild(svg);
    
        // Add pulsating animation to the last emoji
        if (gameProgress.length > 0) {
            const lastEmoji = emojiGroup.lastChild;
            lastEmoji.setAttribute("class", "pulsate");
            const style = document.createElement("style");
            style.textContent = `
                @keyframes pulsate {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                .pulsate {
                    animation: pulsate 1s infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }
            `;
            svg.appendChild(style);
        }
    }
    
    // Update the event listener for the hint button
    hintButton.addEventListener('click', function() {
        if (hintButton.classList.contains('give-up')) {
            handleGiveUp();
        } else if (hintButton.classList.contains('results')) {
            showModal();
        } else {
            handleHint();
        }
    });

    function shareResults() {
        const resultEmojis = gameProgress.join(''); // Join the emoji array into a string
        const shareText = `Beatle #127\n"Escape The Police"\n${resultEmojis}\nBeat me at https://beatle.com`;
    
        if (window.innerWidth >= 600) {
            // Desktop version
            navigator.clipboard.writeText(shareText).then(() => {
                const shareButton = document.getElementById('share-results');
                const originalText = shareButton.textContent;
                
                // Add animation class for copying
                shareButton.classList.add('copy-animation');
                shareButton.textContent = 'Copied to clipboard!';
                
                setTimeout(() => {
                    // Add animation class for returning to original state
                    shareButton.classList.remove('copy-animation');
                    shareButton.classList.add('return-animation');
                    shareButton.textContent = originalText;
                    
                    // Remove the return animation class after it completes
                    setTimeout(() => {
                        shareButton.classList.remove('return-animation');
                    }, 300); // Match this to the animation duration
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            // Mobile version (unchanged)
            if (navigator.share) {
                navigator.share({
                    title: 'My Beatle Puzzle Results',
                    text: shareText,
                }).then(() => {
                    console.log('Thanks for sharing!');
                }).catch(console.error);
            } else {
                // Fallback for mobile browsers that don't support the Web Share API
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('Results copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        }
    }

    // Add this event listener to your existing code
    document.getElementById('share-results').addEventListener('click', shareResults);

    // Settings menu functionality
    const settingsIcon = document.querySelector('.settings-icon');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsMenu = document.getElementById('settings-menu');
    const closeSettings = document.getElementById('close-settings');

    settingsIcon.addEventListener('click', openSettingsMenu);
    closeSettings.addEventListener('click', closeSettingsMenu);
    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
            closeSettingsMenu();
        }
    });

    function openSettingsMenu() {
        settingsOverlay.classList.add('show');
        // Small delay to ensure overlay is visible before menu slides up
        setTimeout(() => {
            settingsMenu.classList.add('show');
        }, 50);
    }
    
    function closeSettingsMenu() {
        settingsMenu.classList.remove('show');
        // Wait for the sliding animation to finish before hiding the overlay
        setTimeout(() => {
            settingsOverlay.classList.remove('show');
        }, 300); // This should match the transition duration in CSS
    }

    // Survey and Email functionalities coming soon
    const surveyLink = document.getElementById('survey-link');

    function showMessage(message) {
        alert(message);
    }

    surveyLink.addEventListener('click', function() {
        showMessage('A survey will come soon! When Beatle is fully done, you can leave your feedback anonymously here! :)');
    });

    // emailLink.addEventListener('click', function() {
    //     showMessage('Bug Reporting functionality coming soon');
    // });

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);

    function toggleDarkMode() {
        // You can implement dark mode logic here
        console.log('Dark mode toggled:', darkModeToggle.checked);
    }

     // Navigation menu functionality
    const menuIcon = document.querySelector('.menu-icon');
    const navOverlay = document.getElementById('nav-overlay');
    const navMenu = document.getElementById('nav-menu');
    const howToPlay = document.getElementById('how-to-play');

    function openNav() {
        navOverlay.style.display = 'block';
        setTimeout(() => {
            navOverlay.classList.add('open');
            navMenu.classList.add('open');
        }, 10); // Small delay to ensure display change has taken effect

        menuIcon.classList.add('open');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    }

    function closeNav() {
        navOverlay.classList.remove('open');
        navMenu.classList.remove('open');
        setTimeout(() => {
            navOverlay.style.display = 'none';
        }, 300); // Match this to your transition time

        menuIcon.classList.remove('open');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }

    function toggleNav() {
        if (navMenu.classList.contains('open')) {
            closeNav();
        } else {
            openNav();
        }
    }

    menuIcon.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', function(e) {
        if (e.target === navOverlay) {
            closeNav();
        }
    });

    // How To Play
    const howToPlayHeader = document.getElementById('how-to-play-header');

    // Add event listener for the header 'How to Play' icon
    if (howToPlayHeader) {
        howToPlayHeader.addEventListener('click', showHowToPlay);
    }

    // Prevent scrolling when nav menu is open
    navMenu.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    // Close nav menu on window resize (for responsiveness)
    window.addEventListener('resize', function() {
        if (navMenu.classList.contains('open')) {
            closeNav();
        }
    });

    // Add this function to gather device information
    function getDeviceInfo() {
        const platform = window.innerWidth <= 600 ? 'Web (Mobile)' : 'Web (Desktop)';
        const browser = (function() {
            const test = function(regexp) { return regexp.test(window.navigator.userAgent); }
            switch (true) {
                case test(/edg/i): return "Microsoft Edge";
                case test(/trident/i): return "Microsoft Internet Explorer";
                case test(/firefox|fxios/i): return "Mozilla Firefox";
                case test(/opr\//i): return "Opera";
                case test(/ucbrowser/i): return "UC Browser";
                case test(/samsungbrowser/i): return "Samsung Browser";
                case test(/chrome|chromium|crios/i): return "Google Chrome";
                case test(/safari/i): return "Apple Safari";
                default: return "Other";
            }
        })();
        const os = (function() {
            const userAgent = window.navigator.userAgent,
                platform = window.navigator,
                macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                iosPlatforms = ['iPhone', 'iPad', 'iPod'];

            if (macosPlatforms.indexOf(platform) !== -1) {
                return 'macOS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                return 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                return 'Windows';
            } else if (/Android/.test(userAgent)) {
                return 'Android';
            } else if (/Linux/.test(platform)) {
                return 'Linux';
            } else {
                return 'Unknown OS';
            }
        })();
        const screenResolution = `${window.screen.width}x${window.screen.height}`;
        const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const time = new Date().toLocaleString();

        return {
            platform,
            browser,
            os,
            screenResolution,
            viewportSize,
            timezone,
            time
        };
    }

    // Modify the email link click event
    const emailLink = document.getElementById('email-link');
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        const deviceInfo = getDeviceInfo();
        const subject = encodeURIComponent('Beatle Bug Report');
        const body = encodeURIComponent(`[Explain your bug here. Include screenshots if you have these available.]

    Best

    ---
    %%% USER SUMMARY %%%
    Platform: ${deviceInfo.platform}
    Browser: ${deviceInfo.browser}
    OS: ${deviceInfo.os}
    Screen Resolution: ${deviceInfo.screenResolution}
    Viewport Size: ${deviceInfo.viewportSize}
    Timezone: ${deviceInfo.timezone}
    Time: ${deviceInfo.time}
    ---`);

        window.location.href = `mailto:test@test.com?subject=${subject}&body=${body}`;
    });

    function resetGame() {
        userGaveUp = false; // Reset user gave up flag
        hintsUsed = 0; // Reset hints used counter
        gameProgress = []; // Reset the progress of the game
        // Other reset logic...
    }

    // HOW TO PLAY
    const howToPlayModal = document.getElementById('how-to-play-modal');
    const closeBtn = document.querySelector('.how-to-play-close');
    const backButton = document.getElementById('how-to-play-back-button');
    const nextButton = document.getElementById('how-to-play-next-button');
    const pageDots = document.querySelectorAll('.how-to-play-dot');

    let currentPage = 0;
    const totalPages = 3;

    const modalContent = [
        {
            image: 'path/to/image1.jpg',
            title: 'Find theme words to fill the board.',
            list: [
                'Theme words stay highlighted in blue when found.',
                'Drag or tap letters to create words. If tapping, double tap the last letter to submit.',
                'Theme words fill the board entirely. No theme words overlap.'
            ]
        },
        {
            image: 'path/to/image2.jpg',
            title: 'Find the "spangram."',
            list: [
                'The spangram describes the puzzle\'s theme and touches two opposite sides of the board. It may be two words.',
                'The spangram highlights in yellow when found.',
                'An example spangram with corresponding theme words: PEAR, FRUIT, BANANA, APPLE, etc.'
            ]
        },
        {
            image: 'path/to/image3.jpg',
            title: 'Need a hint?',
            list: [
                'Find non-theme words to get hints.',
                'For every 3 non-theme words you find, you earn a hint.',
                'Hints show the letters of a theme word. If there is already an active hint on the board, a hint will show that word\'s letter order.'
            ]
        }
      ];

      function showHowToPlay() {
        resetHowToPlayModal(); // Reset the modal before showing it
        howToPlayModal.style.display = 'block';
        setTimeout(() => {
            howToPlayModal.classList.add('show');
        }, 10);
    }

    // Update this part
    howToPlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeNav();
        setTimeout(() => {
            showHowToPlay();
        }, 300); // Delay opening the modal until after the navbar closes
    });

    function resetHowToPlayModal() {
        currentPage = 0;
        updateModalContent();
        
        // Reset the back button
        backButton.disabled = true;
        
        // Reset the next button
        nextButton.textContent = 'Next';
        nextButton.classList.remove('last-page');
    }

    // Modify the closeHowToPlay function
    function closeHowToPlay() {
        howToPlayModal.classList.remove('show');
        setTimeout(() => {
            howToPlayModal.style.display = 'none';
            resetHowToPlayModal(); // Reset the modal when closing
        }, 300);
    }

    function updateModalContent() {
        const imageContainer = document.querySelector('.how-to-play-image-container');
        const modalTitle = document.querySelector('.how-to-play-title');
        const explanationTitle = document.querySelector('.explanation-title');
        const explanationList = document.querySelector('.explanation-list');
        
        modalTitle.textContent = "How to Play";
        imageContainer.style.backgroundImage = `url(${modalContent[currentPage].image})`;
        explanationTitle.textContent = modalContent[currentPage].title;
        
        explanationList.innerHTML = '';
        modalContent[currentPage].list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            explanationList.appendChild(li);
        });
        
        const pageDots = document.querySelectorAll('.how-to-play-dot');
        pageDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
        
        const backButton = document.getElementById('how-to-play-back-button');
        const nextButton = document.getElementById('how-to-play-next-button');
        backButton.disabled = currentPage === 0;
        nextButton.textContent = currentPage === totalPages - 1 ? 'Play' : 'Next';
        
        // Update next button appearance
        if (currentPage === totalPages - 1) {
            nextButton.classList.add('last-page');
        } else {
            nextButton.classList.remove('last-page');
        }
    }

    function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateModalContent();
    } else {
        closeHowToPlay();
    }
    }

    function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        updateModalContent();
    }
    }

    // Event listeners
    document.getElementById('how-to-play-header').addEventListener('click', showHowToPlay);
    document.getElementById('how-to-play').addEventListener('click', showHowToPlay);
    closeBtn.addEventListener('click', closeHowToPlay);
    nextButton.addEventListener('click', nextPage);
    backButton.addEventListener('click', previousPage);

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
    if (event.target === howToPlayModal) {
        closeHowToPlay();
    }
    });
});
