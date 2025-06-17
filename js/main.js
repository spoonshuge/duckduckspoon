// Game canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game state
let gameRunning = false;
let testCircle = { x: 100, y: 100, dx: 2, dy: 1 };

// Game loop
function gameLoop() {
    if (!gameRunning) return;
    
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Move test circle
    testCircle.x += testCircle.dx;
    testCircle.y += testCircle.dy;
    
    // Bounce off edges
    if (testCircle.x <= 20 || testCircle.x >= canvas.width - 20) {
        testCircle.dx = -testCircle.dx;
    }
    if (testCircle.y <= 20 || testCircle.y >= canvas.height - 20) {
        testCircle.dy = -testCircle.dy;
    }
}

function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw test circle
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(testCircle.x, testCircle.y, 20, 0, Math.PI * 2);
    ctx.fill();
}

// Initialize the game
function init() {
    console.log('Duck Hunt initialized');
    gameRunning = true;
    gameLoop();
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', init);