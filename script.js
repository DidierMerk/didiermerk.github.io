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

    // For animations
    let lastPulsateTimeout = null;
    let isAnimating = false;

    // For hint system
    let hintsRemaining = 0;
    let hintsAtLastRefill = 0;

    // For audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffers = {}; // Keyed by audioSrc

    let audioQueue = [];
    let isPlayingAudio = false;
    let audioStartTime = 0;
    let scheduledAudioNodes = [];

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

    // Pre load the audio
    preloadAudioBuffers(function() {
        console.log('All audio files have been preloaded.');
    });

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
    
        // Assign data attributes to the cells
        for (let pathIndex = 0; pathIndex < solutionPaths.length; pathIndex++) {
            const path = solutionPaths[pathIndex];
            for (let fragmentIndex = 0; fragmentIndex < path.length; fragmentIndex++) {
                const cellIndex = path[fragmentIndex];
                const cell = gridContainer.children[cellIndex];
                cell.dataset.track = pathIndex + 1; // Tracks are track1 to track5
                cell.dataset.fragment = fragmentIndex + 1; // Fragment numbers start from 1
                cell.dataset.version = 'instr'; // Default to instrumental version
            }
        }
    }

    function addToAudioQueue(cell) {
        const track = cell.dataset.track;
        const fragment = cell.dataset.fragment;
        const version = cell.dataset.version;
        const audioSrc = `tracks/track${track}/track${track}_${version}_${fragment}.mp3`;
    
        audioQueue.push({ audioSrc, cell });
    
        if (!isPlayingAudio) {
            playAudioQueue();
        } else {
            // Schedule the new audio fragment to play after the current queue
            scheduleNextInQueue();
        }
    }
    

    function playAudioQueue() {
        if (audioQueue.length === 0) {
            isPlayingAudio = false;
            audioStartTime = 0;
            scheduledAudioNodes = [];
            return;
        }
    
        isPlayingAudio = true;
        audioStartTime = audioContext.currentTime;
        scheduledAudioNodes = [];
    
        // Schedule all audio fragments in the queue
        let currentTime = audioStartTime;
        audioQueue.forEach((item, index) => {
            const { audioSrc, cell } = item;
            const audioBuffer = audioBuffers[audioSrc];
    
            if (audioBuffer) {
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
    
                // Indicate the cell is currently playing
                const startTime = currentTime;
                const duration = audioBuffer.duration;
    
                source.start(startTime);
    
                // Schedule visual indication
                scheduleCellPlaying(cell, startTime, duration);
    
                scheduledAudioNodes.push(source);
    
                // Increment current time by the duration of the audio buffer
                currentTime += duration;
            } else {
                console.error('Audio buffer not found for:', audioSrc);
            }
        });
    
        // Clear the queue after scheduling
        audioQueue = [];
    
        // Schedule a function to set isPlayingAudio to false after all audio has played
        const totalDuration = currentTime - audioStartTime;
        setTimeout(() => {
            isPlayingAudio = false;
        }, totalDuration * 1000); // Convert to milliseconds
    }

    function scheduleCellPlaying(cell, startTime, duration) {
        // Schedule the cell to change color when its audio starts
        setTimeout(() => {
            cell.classList.add('currently-playing');
        }, (startTime - audioContext.currentTime) * 1000);
    
        // Schedule the cell to revert color when its audio ends
        setTimeout(() => {
            cell.classList.remove('currently-playing');
        }, (startTime + duration - audioContext.currentTime) * 1000);
    }

    function clearAudioQueue() {
        audioQueue = [];
        isPlayingAudio = false;
        audioStartTime = 0;
    
        // Stop any scheduled audio
        scheduledAudioNodes.forEach(node => {
            try {
                node.stop();
            } catch (e) {
                console.error('Error stopping audio node:', e);
            }
        });
        scheduledAudioNodes = [];
    
        // Remove any 'currently-playing' classes from cells
        const cells = gridContainer.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.classList.remove('currently-playing');
        });
    }
    

    function trimAudioQueue(length) {
        // Since we've already scheduled the audio, we need to stop the extra ones
        const extraNodes = scheduledAudioNodes.slice(length);
        extraNodes.forEach(node => {
            try {
                node.stop();
            } catch (e) {
                console.error('Error stopping audio node:', e);
            }
        });
        scheduledAudioNodes = scheduledAudioNodes.slice(0, length);
    
        // Adjust the audio queue accordingly
        audioQueue = audioQueue.slice(0, length);
    }
    

    // Getting rid of buffers
    function preloadAudioBuffers(callback) {
        const allAudioSrcs = [];
    
        // Collect all possible audio sources
        for (let track = 1; track <= 5; track++) {
            for (let version of ['instr', 'vocal']) {
                for (let fragment = 1; fragment <= 15; fragment++) { // Assuming maximum of 15 fragments per track
                    const audioSrc = `tracks/track${track}/track${track}_${version}_${fragment}.mp3`;
                    allAudioSrcs.push(audioSrc);
                }
            }
        }
    
        let loadedCount = 0;
        const totalToLoad = allAudioSrcs.length;
    
        allAudioSrcs.forEach(src => {
            fetch(src)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.arrayBuffer();
                })
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    audioBuffers[src] = audioBuffer;
                    loadedCount++;
                    if (loadedCount === totalToLoad) {
                        if (callback) callback();
                    }
                })
                .catch(error => {
                    console.error('Error loading audio file:', src, error);
                    loadedCount++;
                    if (loadedCount === totalToLoad) {
                        if (callback) callback();
                    }
                });
        });
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
        let selectedPath = [];
        let isSelecting = false;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        const dragThreshold = 5; // Minimum movement in pixels to consider as a drag
        let svg = null;

        // Ensure audio context is resumed on user interaction
        ['mousedown', 'touchstart'].forEach(event => {
            window.addEventListener(event, () => {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            }, { once: true });
        });
    
        const gridCells = Array.from(gridContainer.querySelectorAll('.grid-cell'));
    
        function getCellCoords(cell) {
            const index = Array.prototype.indexOf.call(gridContainer.children, cell);
            if (index === -1) {
                console.error('Cell not found in gridContainer.children');
                return null;
            }
            return { row: Math.floor(index / gridSizeCols), col: index % gridSizeCols };
        }
    
        function isAdjacent(cell1, cell2) {
            const rowDiff = Math.abs(cell1.row - cell2.row);
            const colDiff = Math.abs(cell1.col - cell2.col);
            return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
        }
    
        function updateCellSelection() {
            gridCells.forEach((cell, index) => {
                const row = Math.floor(index / gridSizeCols);
                const col = index % gridSizeCols;
                const isSelected = selectedPath.some(c => c.row === row && c.col === col);
        
                // Remove 'last-selected' class from all cells
                cell.classList.remove('last-selected');
        
                if (isSelected) {
                    if (!cell.classList.contains('selected')) {
                        cell.classList.add('selected', 'bounce');
                        // Listen for the end of the animation to replace 'bounce' with 'bounced'
                        cell.addEventListener('animationend', function handler() {
                            cell.classList.remove('bounce');
                            cell.classList.add('bounced');
                            cell.removeEventListener('animationend', handler);
                        });
                    }
                } else {
                    cell.classList.remove('selected', 'bounced');
                }
            });
        
            // Clear previous timeout for pulsate effect
            if (lastPulsateTimeout) {
                clearTimeout(lastPulsateTimeout);
                lastPulsateTimeout = null;
            }
        
            // Set a timeout to add 'last-selected' class to the last cell after 1 second
            if (selectedPath.length > 0) {
                const lastCellCoords = selectedPath[selectedPath.length - 1];
                const lastCellIndex = lastCellCoords.row * gridSizeCols + lastCellCoords.col;
                const lastCell = gridCells[lastCellIndex];
        
                lastPulsateTimeout = setTimeout(() => {
                    lastCell.classList.add('last-selected');
                }, 400);
            }
        }        
    
        function updateLines() {
            if (!svg) {
                svg = createSVGOverlay();
            }
        
            // Remove existing lines only if not animating
            if (!isAnimating) {
                svg.querySelectorAll('line.temp-line').forEach(line => line.remove());
            }
        
            // Draw new lines for the current selected path
            if (selectedPath.length > 1) {
                const gridRect = gridContainer.getBoundingClientRect();
        
                for (let i = 1; i < selectedPath.length; i++) {
                    const start = selectedPath[i - 1];
                    const end = selectedPath[i];
        
                    const startIndex = start.row * gridSizeCols + start.col;
                    const endIndex = end.row * gridSizeCols + end.col;
        
                    const startCell = gridCells[startIndex];
                    const endCell = gridCells[endIndex];
                    const startRect = startCell.getBoundingClientRect();
                    const endRect = endCell.getBoundingClientRect();
        
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', startRect.left - gridRect.left + startRect.width / 2);
                    line.setAttribute('y1', startRect.top - gridRect.top + startRect.height / 2);
                    line.setAttribute('x2', endRect.left - gridRect.left + endRect.width / 2);
                    line.setAttribute('y2', endRect.top - gridRect.top + endRect.height / 2);
                    line.setAttribute('stroke', '#dbd8c5');
                    line.setAttribute('stroke-width', '1.3vh');
                    line.setAttribute('stroke-linecap', 'round');
                    line.classList.add('temp-line');
                    line.style.opacity = '1'; // Ensure the line starts fully opaque
        
                    svg.appendChild(line);
                }
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
    
            const point = getEventPoint(e);
            startX = point.x;
            startY = point.y;
        }
    
        function handleMove(e) {
            if (!isSelecting) return;
    
            const point = getEventPoint(e);
            const dx = point.x - startX;
            const dy = point.y - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (!isDragging && distance >= dragThreshold) {
                isDragging = true;
            }
    
            if (isDragging) {
                let cell;
                if (e.type.startsWith('touch')) {
                    const touch = e.touches[0];
                    cell = document.elementFromPoint(touch.clientX, touch.clientY);
                } else if (e.type.startsWith('mouse')) {
                    cell = document.elementFromPoint(e.clientX, e.clientY);
                }
    
                if (cell && cell.classList.contains('grid-cell')) {
                    handleCellSelection(cell);
                }
            }
        }
    
        function handleEnd(e) {
            if (e.type.startsWith('touch')) {
                if (!isDragging) {
                    // This was a tap, not a drag
                    const touch = e.changedTouches[0];
                    const cell = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (cell && cell.classList.contains('grid-cell')) {
                        const coords = getCellCoords(cell);
                        if (selectedPath.length > 0) {
                            const lastCell = selectedPath[selectedPath.length - 1];
                            if (coords.row === lastCell.row && coords.col === lastCell.col && selectedPath.length > 1) {
                                // Tapped the last cell of a path with more than one cell
                                handleCellSelection(cell, true); // isClick = true
                            } else {
                                // Start or continue building the path
                                handleCellSelection(cell);
                            }
                        } else {
                            // Start a new path
                            handleCellSelection(cell);
                        }
                    }
                } else {
                    // Dragging ended, check the path
                    checkSelectedPath();
                }
            } else if (isDragging) {
                // Mouse dragging ended
                checkSelectedPath();
            }
            isSelecting = false;
            isDragging = false;
        }
    
        function handleClick(e) {
            const cell = e.target.closest('.grid-cell');
            if (cell) {
                handleCellSelection(cell, true); // Pass 'true' to indicate click
            }
            // Reset selection state after handling the click
            isSelecting = false;
            isDragging = false;
            isClick = true;
        }
    
        function handleCellSelection(cell, isClick = false) {
            if (isAnimating || cell.classList.contains('found')) return;
    
            const coords = getCellCoords(cell);
    
            if (selectedPath.length === 0) {
                // Start a new path
                selectedPath.push(coords);
                // Play audio fragment for the first cell
                clearAudioQueue();
                addToAudioQueue(cell);
            } else {
                const lastCell = selectedPath[selectedPath.length - 1];
    
                if (coords.row === lastCell.row && coords.col === lastCell.col) {
                    // Clicked on the last selected cell
                    if (isClick && selectedPath.length > 1) {
                        checkSelectedPath();
                        // Exit the function to prevent calling updateCellSelection() and updateLines()
                        return;
                    }
                } else if (selectedPath.some(c => c.row === coords.row && c.col === coords.col)) {
                    // Cell is already in the path
                    const existingIndex = selectedPath.findIndex(c => c.row === coords.row && c.col === coords.col);
                    if (existingIndex !== selectedPath.length - 1) {
                        selectedPath = selectedPath.slice(0, existingIndex + 1);
                        // Adjust the audio queue accordingly
                        trimAudioQueue(selectedPath.length);
                    } else {
                        if (isClick && selectedPath.length > 1) {
                            checkSelectedPath();
                            // Exit the function to prevent calling updateCellSelection() and updateLines()
                            return;
                        }
                    }
                } else if (isAdjacent(lastCell, coords)) {
                    // Cell is adjacent to the last cell
                    selectedPath.push(coords);
                    // Play audio fragment for the new cell
                    addToAudioQueue(cell);
                } else {
                    // Cell is not adjacent
                    if (isClick) {
                        // For clicking/tapping, start a new path
                        selectedPath = [coords];
                        // Clear the audio queue and start a new one
                        clearAudioQueue();
                        addToAudioQueue(cell);
                    } else {
                        // For touch-dragging, ignore the cell
                        // Do nothing
                    }
                }
            }
    
            updateCellSelection();
            updateLines();
        }        
    
        function checkSelectedPath() {
            if (selectedPath.length > 0) {
                const selectedIndices = selectedPath.map(cell => cell.row * gridSizeCols + cell.col);
                const pathIndex = checkPath(selectedPath);
                if (pathIndex !== -1 && !isPathFound(pathIndex)) {
                    console.log("Path checked and correct!");
                    markPathAsFound(pathIndex);
                    selectedPath = [];
                    updateCellSelection();
                    updateLines();
                    clearAudioQueue(); // Clear audio queue when path is correct
                } else {
                    console.log("Path checked but wrong!");
                    // Trigger the shake animation
                    shakeSelectedCells();
                    clearAudioQueue(); // Clear audio queue when path is incorrect
                }
            }
        }

        function shakeSelectedCells() {
            isAnimating = true; // Disable user interactions during animation
            const gridCells = Array.from(gridContainer.querySelectorAll('.grid-cell'));
            const selectedCellElements = selectedPath.map(coords => {
                const index = coords.row * gridSizeCols + coords.col;
                return gridCells[index];
            });
        
            // Clear the audio queue
            clearAudioQueue();        
        
            // Get the temp lines (SVG lines) corresponding to the selected path
            const svg = gridContainer.querySelector('svg');
            const tempLines = Array.from(svg.querySelectorAll('.temp-line'));
        
            let animationsCompleted = 0;
        
            selectedCellElements.forEach(cell => {
                cell.classList.add('shake');
                cell.addEventListener('animationend', function handler() {
                    cell.classList.remove('shake', 'selected', 'bounced');
                    cell.removeEventListener('animationend', handler);
                    animationsCompleted++;
                    if (animationsCompleted === selectedCellElements.length) {
                        // All animations are complete
        
                        // Remove the lines immediately
                        tempLines.forEach(line => line.remove());
        
                        // Clear the selected path and update cell selection
                        selectedPath = [];
                        updateCellSelection();
                        isAnimating = false; // Re-enable user interactions
                    }
                });
            });
        }        
    
        function getEventPoint(e) {
            if (e.type.startsWith('mouse')) {
                return { x: e.clientX, y: e.clientY };
            } else if (e.type.startsWith('touch')) {
                const touch = e.touches[0] || e.changedTouches[0];
                return { x: touch.clientX, y: touch.clientY };
            }
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
        
            // Update hintsRemaining and hintsAtLastRefill
            hintsRemaining += 2;
            hintsAtLastRefill = hintsRemaining;
        
            // Add finding a path to the game progress
            gameProgress.push(progressEmojis[`path${pathIndex}`]);
        
            // Update the score counter
            updateScoreCounter();
        
            // Now, update the hint button
            if (foundPaths === numberOfPaths) {
                hintButton.textContent = 'Results';
                hintButton.classList.remove('give-up');
                hintButton.classList.add('results');
                animateGridCompletion();
            } else {
                updateHintButton();
            }
        }

        // Redrawing the lines
        window.addEventListener('resize', function() {
            adjustGridLayout();
            redrawAllLines();
        });

        function redrawAllLines() {
            let svg = gridContainer.querySelector('svg');
            if (!svg) {
                svg = createSVGOverlay();
            }
        
            // Remove all existing lines
            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }
        
            // Redraw permanent lines for found paths
            solutionPaths.forEach((path, index) => {
                if (isPathFound(index)) {
                    drawPathLines(path, 'permanent');
                }
            });
        
            // Redraw temporary lines for the selected path
            if (selectedPath.length > 1) {
                drawSelectedPathLines();
            }
        }

        function drawPathLines(path, lineClass) {
            const svg = gridContainer.querySelector('svg');
            const gridRect = gridContainer.getBoundingClientRect();
            for (let i = 1; i < path.length; i++) {
                const startIndex = path[i - 1];
                const endIndex = path[i];
        
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
                line.classList.add(lineClass);
        
                svg.appendChild(line);
            }
        }
        
        function drawSelectedPathLines() {
            const svg = gridContainer.querySelector('svg');
            const gridRect = gridContainer.getBoundingClientRect();
        
            for (let i = 1; i < selectedPath.length; i++) {
                const start = selectedPath[i - 1];
                const end = selectedPath[i];
        
                const startIndex = start.row * gridSizeCols + start.col;
                const endIndex = end.row * gridSizeCols + end.col;
        
                const startCell = gridContainer.children[startIndex];
                const endCell = gridContainer.children[endIndex];
                const startRect = startCell.getBoundingClientRect();
                const endRect = endCell.getBoundingClientRect();
        
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', startRect.left - gridRect.left + startRect.width / 2);
                line.setAttribute('y1', startRect.top - gridRect.top + startRect.height / 2);
                line.setAttribute('x2', endRect.left - gridRect.left + endRect.width / 2);
                line.setAttribute('y2', endRect.top - gridRect.top + endRect.height / 2);
                line.setAttribute('stroke', '#dbd8c5');
                line.setAttribute('stroke-width', '1.3vh');
                line.setAttribute('stroke-linecap', 'round');
                line.classList.add('temp-line');
        
                svg.appendChild(line);
            }
        }

        // End of redrawing the lines
    
        // Mouse events
        gridContainer.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
    
        // Touch events
        gridContainer.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
    
        // Click event
        gridContainer.addEventListener('click', handleClick);
    
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
        if (hintsRemaining <= 0) {
            showNeedHintModal();
            return;
        }
    
        hintsRemaining--;
        updateHintButton();

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
                hintButton.style.background = '';
                hintButton.style.backgroundColor = '';
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
            hintButton.style.background = '';
            hintButton.style.backgroundColor = '';
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
            cell.dataset.version = 'vocal'; // Change to vocal version
        });
    }

    function updateHintButton() {
        // Remove state-specific classes
        hintButton.classList.remove('give-up', 'disabled', 'results');
    
        // Remove inline background styles
        hintButton.style.background = '';
        hintButton.style.backgroundColor = '';
    
        // Check if the user has given up
        if (userGaveUp) {
            hintButton.textContent = 'Results';
            hintButton.classList.add('results');
            return; // Exit the function to prevent further changes
        }
    
        // Check if all paths are found
        if (foundPaths >= numberOfPaths) {
            hintButton.textContent = 'Results';
            hintButton.classList.add('results');
            return; // Exit the function
        }
    
        // Check if all hints are given for remaining paths
        if (areAllHintsGiven()) {
            hintButton.textContent = 'Give Up';
            hintButton.classList.add('give-up');
            return; // Exit the function
        }
    
        // Check if no hints are remaining but some hints are still available
        if (hintsRemaining === 0) {
            hintButton.textContent = 'No Hints';
            hintButton.classList.add('disabled');
            return; // Exit the function
        }
    
        // Hints are available
        hintButton.textContent = `Hint (${hintsRemaining})`;
    
        // Apply background gradient
        let percentage = (hintsAtLastRefill > 0)
            ? (hintsRemaining / hintsAtLastRefill) * 100
            : 0;
        percentage = Math.max(0, Math.min(percentage, 100));
        hintButton.style.background = `linear-gradient(to right, #3498db ${percentage}%, #ccc ${percentage}%)`;
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
    
        // After revealing paths, update the button
        setTimeout(() => {
            hintButton.disabled = false;
            updateHintButton(); // Update the button state
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
        } else if (hintsRemaining === 0) {
            showNeedHintModal();
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

    
    // Opening the settings menu 
    settingsIcon.addEventListener('click', function(e) {
        if (navMenu.classList.contains('open')) {
            closeNav(); // and possibly closing the nav menu
            openSettingsMenu();
        } else {
            openSettingsMenu();
        }    
    });

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
    const pagesContainer = document.querySelector('.how-to-play-pages-container');

    let currentPage = 0;
    const totalPages = 3;
    let startX, moveX;
    let isDragging = false;

    function showHowToPlay() {
        resetHowToPlayModal();
        howToPlayModal.style.display = 'block';
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            howToPlayModal.classList.add('show');
        }, 10);
    }

    function closeHowToPlay() {
        howToPlayModal.classList.remove('show');
        setTimeout(() => {
            howToPlayModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
            resetHowToPlayModal();
        }, 300);
    }

    function resetHowToPlayModal() {
        currentPage = 0;
        updateModalContent();
        backButton.disabled = true;
        nextButton.textContent = 'Next';
        nextButton.classList.remove('last-page');
    }

    function updateModalContent() {
        pagesContainer.style.transform = `translateX(-${currentPage * 33.333}%)`;
        
        pageDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
        
        backButton.disabled = currentPage === 0;
        nextButton.textContent = currentPage === totalPages - 1 ? 'Play' : 'Next';
        
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

    // Touch event handlers
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault(); // Add this line to prevent default scrolling behavior
        moveX = e.touches[0].clientX;
        const diff = startX - moveX;
        const translateX = -currentPage * 33.333 - (diff / pagesContainer.offsetWidth) * 100;
        pagesContainer.style.transform = `translateX(${translateX}%)`;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - moveX;
        const threshold = pagesContainer.offsetWidth / 20; // Reduced threshold from /4 to /10
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentPage < totalPages - 1) {
                nextPage();
            } else if (diff < 0 && currentPage > 0) {
                previousPage();
            } else {
                updateModalContent(); // Reset to current page
            }
        } else {
            updateModalContent(); // Reset to current page
        }
    }

    // Event listeners
    document.getElementById('how-to-play-header').addEventListener('click', function(e) {
        if (navMenu.classList.contains('open')) {
            closeNav();
            setTimeout(() => {
                showHowToPlay();
            }, 300); // Delay opening the modal if navbar is opened
        } else {
            showHowToPlay();
        }    
    });

    document.getElementById('how-to-play').addEventListener('click', function(e) {
        e.preventDefault();
        closeNav();
        setTimeout(() => {
            showHowToPlay();
        }, 300);
    });
    closeBtn.addEventListener('click', closeHowToPlay);
    nextButton.addEventListener('click', nextPage);
    backButton.addEventListener('click', previousPage);

    pagesContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    pagesContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    pagesContainer.addEventListener('touchend', handleTouchEnd);

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === howToPlayModal) {
            closeHowToPlay();
        }
    });

    // Need a Hint Modal functionality
    const needHintClose = document.querySelector('.need-hint-close');
    const needHintGiveUp = document.getElementById('need-hint-give-up');
    const needHintOkay = document.getElementById('need-hint-okay');

    function showNeedHintModal() {
        const needHintModal = document.getElementById('need-hint-modal');
        const needHintModalContent = needHintModal.querySelector('.need-hint-modal-content');
        
        needHintModal.style.display = 'flex';
        
        // Trigger reflow to ensure the transition works
        void needHintModal.offsetWidth;
        
        needHintModal.classList.add('show');
        needHintModalContent.style.animation = 'hintModalZoomIn 0.3s ease-out forwards';
    }
    
    function closeNeedHintModal() {
        const needHintModal = document.getElementById('need-hint-modal');
        const needHintModalContent = needHintModal.querySelector('.need-hint-modal-content');
        
        needHintModal.classList.remove('show');
        needHintModalContent.style.animation = 'hintModalZoomOut 0.3s ease-out forwards';
        
        // Wait for the animation to complete before hiding the modal
        setTimeout(() => {
            needHintModal.style.display = 'none';
        }, 300);
    }

    needHintClose.addEventListener('click', closeNeedHintModal);
    needHintOkay.addEventListener('click', closeNeedHintModal);
    needHintGiveUp.addEventListener('click', function() {
        closeNeedHintModal();
        handleGiveUp();
    });

    // Close modal if user clicks outside the content
    document.getElementById('need-hint-modal').addEventListener('click', function(event) {
        if (event.target === this) {
            closeNeedHintModal();
        }
    });

        
});
