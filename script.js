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
            if (footer) footer.style.visibility = 'hidden';
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
        
            const pathToUpdate = permanent ? solutionPaths[foundPaths - 1] : selectedPath;
            if (!pathToUpdate) return;
        
            for (let i = 1; i < pathToUpdate.length; i++) {
                const start = permanent ? 
                    { row: Math.floor(pathToUpdate[i-1] / gridSizeCols), col: pathToUpdate[i-1] % gridSizeCols } :
                    pathToUpdate[i-1];
                const end = permanent ? 
                    { row: Math.floor(pathToUpdate[i] / gridSizeCols), col: pathToUpdate[i] % gridSizeCols } :
                    pathToUpdate[i];
        
                const startCell = gridContainer.children[start.row * gridSizeCols + start.col];
                const endCell = gridContainer.children[end.row * gridSizeCols + end.col];
                const startRect = startCell.getBoundingClientRect();
                const endRect = endCell.getBoundingClientRect();
        
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', startRect.left - gridRect.left + startRect.width / 2);
                line.setAttribute('y1', startRect.top - gridRect.top + startRect.height / 2);
                line.setAttribute('x2', endRect.left - gridRect.left + endRect.width / 2);
                line.setAttribute('y2', endRect.top - gridRect.top + endRect.height / 2);
                line.setAttribute('stroke', permanent ? '#aedfee' : '#dbd8c5');
                line.setAttribute('stroke-width', '1.3vh');
                line.setAttribute('stroke-linecap', 'round');
        
                if (permanent) {
                    line.classList.add('permanent');
                }
        
                svg.appendChild(line);
            }
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
                showModal();
            }

            if (areAllHintsGiven()) {
                hintButton.textContent = 'Give Up';
                hintButton.classList.add('give-up');
            } else {
                updateHintButton();
            }
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

    // Add this event listener to open the modal when the "Give Up" button is clicked
    hintButton.addEventListener('click', function() {
        if (hintButton.classList.contains('give-up')) {
            // Change button to "Results" and style it
            hintButton.textContent = 'Results';
            hintButton.classList.remove('give-up');
            hintButton.classList.add('results'); // New class for styling
            showModal();  // Show modal when "Give Up" is clicked
        } else if (hintButton.classList.contains('results')) {
            showModal();  // Show modal when "Results" button is clicked
        }
    });
    
    hintButton.addEventListener('click', handleHint);

    function handleHint() {
        const undiscoveredPaths = solutionPaths.reduce((acc, path, index) => {
            if (!isPathFound(index)) {
                acc.push({ path, index });
            }
            return acc;
        }, []);
        
        if (undiscoveredPaths.length === 0) {
            console.log("All paths discovered!");
            hintButton.textContent = 'All Found!';
            hintButton.disabled = true;
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
        } else {
            showVocalHint(path, pathIndex);
            hintState[pathIndex].vocalHint = true;
        }
    
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
        modal.style.display = 'flex';
        
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

    // Add functionality to the "Share your results" button (placeholder for now)
    const shareButton = document.getElementById('share-results');
    shareButton.addEventListener('click', function() {
        alert('Sharing functionality will be implemented soon!');
    });
});
