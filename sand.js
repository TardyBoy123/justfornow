let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;  // Set canvas width to 300px
canvas.height = 300;  // Set canvas height to 300px

let w = 2;  // Grain size
let rows = Math.floor(canvas.height / w);
let cols = Math.floor(canvas.width / w);
let grid = make2DArray(cols, rows);
let hueValue = 200;
let hueSpeed = 0.1;  // Initial hue change speed
let drawing = false;
let mouseX = 0, mouseY = 0;
let spawnAmount = 3;  // Number of sand grains spawned
let hueUpdateInterval = 100;  // Number of frames before hue changes
let frameCounter = 0;  // Counter to slow down hue speed

// Update grid size when grain size is changed
document.getElementById('grainSize').addEventListener('input', function() {
    w = parseInt(this.value);  // Update grain size
    rows = Math.floor(canvas.height / w);  // Recalculate rows
    cols = Math.floor(canvas.width / w);  // Recalculate columns
    grid = make2DArray(cols, rows);  // Reset grid
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
    document.getElementById('grainSizeValue').textContent = w;
});

// Update hue speed when hue speed slider is changed
document.getElementById('hueSpeed').addEventListener('input', function() {
    hueSpeed = parseFloat(this.value);  // Update hue speed directly
    document.getElementById('hueSpeedValue').textContent = hueSpeed.toFixed(2);
});

// Update spawn amount when spawn amount slider is changed
document.getElementById('spawnAmount').addEventListener('input', function() {
    spawnAmount = parseInt(this.value);
    document.getElementById('spawnAmountValue').textContent = spawnAmount;
});

// Clear canvas button functionality
document.getElementById('clearCanvas').addEventListener('click', function() {
    grid = make2DArray(cols, rows);  // Clear the grid
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
});

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}

function drawOnCanvas() {
    let mouseCol = Math.floor(mouseX / w);
    let mouseRow = Math.floor(mouseY / w);

    let extent = Math.floor(spawnAmount / 2);  // Control spawn area based on slider value
    
    for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
            let col = mouseCol + i;
            let row = mouseRow + j;
            
            if (withinCols(col) && withinRows(row) && grid[col][row] === 0) {
                if (Math.random() < 0.3) {
                    grid[col][row] = hueValue;
                }
            }
        }
    }

    // Only update hue value after a certain interval
    frameCounter++;
    if (frameCounter >= hueUpdateInterval) {
        hueValue = (hueValue + hueSpeed) % 360;  // Change hue based on hueSpeed
        frameCounter = 0;  // Reset the counter
    }
}

canvas.addEventListener("mousedown", function(event) {
    drawing = true;
    updateMousePosition(event);
    startDrawing();  // Start the draw loop
});

canvas.addEventListener("mousemove", function(event) {
    if (drawing) {
        updateMousePosition(event);  // Update mouse position continuously
    }
});

canvas.addEventListener("mouseup", function() {
    drawing = false;  // Stop drawing when mouse is released
});

canvas.addEventListener("mouseleave", function() {
    drawing = false;  // Stop drawing when mouse leaves the canvas
});

// Function to track the mouse position
function updateMousePosition(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
}

// Continuous drawing function when the mouse is pressed
function startDrawing() {
    if (drawing) {
        drawOnCanvas();  // Continue drawing
        requestAnimationFrame(startDrawing);  // Recursively call using requestAnimationFrame
    }
}

function withinCols(i) {
    return i >= 0 && i < cols;
}

function withinRows(j) {
    return j >= 0 && j < rows;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render the current state of the grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] > 0) {
                ctx.fillStyle = `hsl(${grid[i][j]}, 100%, 50%)`;
                ctx.fillRect(i * w, j * w, w, w);
            }
        }
    }

    // Create a new grid for the next state
    let nextGrid = make2DArray(cols, rows);

    // Update the grid: iterate from bottom to top
    for (let j = rows - 1; j >= 0; j--) {
        for (let i = 0; i < cols; i++) {
            let state = grid[i][j];  // Get the current cell's state
            if (state > 0) {  // If there's sand in the current cell
                let below = (j < rows - 1) ? grid[i][j + 1] : -1;  // Cell directly below

                // Random direction (-1 or 1) for diagonal movement
                let dir = Math.random() < 0.5 ? -1 : 1;
                
                // Check diagonal neighbors
                let belowA = withinCols(i + dir) && (j < rows - 1) ? grid[i + dir][j + 1] : -1;
                let belowB = withinCols(i - dir) && (j < rows - 1) ? grid[i - dir][j + 1] : -1;

                // Move particle down if possible
                if (below === 0) {
                    nextGrid[i][j + 1] = state;  // Move directly down
                } 
                // Otherwise, try to move diagonally if possible
                else if (belowA === 0) {
                    nextGrid[i + dir][j + 1] = state;  // Move diagonally in one direction
                } 
                else if (belowB === 0) {
                    nextGrid[i - dir][j + 1] = state;  // Move diagonally in the other direction
                } 
                // If no movement is possible, the particle stays in place
                else {
                    nextGrid[i][j] = state;
                }
            }
        }
    }

    // Update the grid for the next frame
    grid = nextGrid;

    // Call draw function continuously
    requestAnimationFrame(draw);
}

// Ensure the grid is correctly set when initializing the canvas size
draw();
