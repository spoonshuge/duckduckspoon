// Game canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game state
let gameRunning = false;
let circles = [
    { x: 100, y: 100, dx: 2, dy: 1, radius: 20, active: true }
];
let currentRound = 1;
let timeRemaining = 10;
let roundActive = false;
let gameOver = false;
let finalRound = 0;

// Game loop
function gameLoop() {
    if (!gameRunning) return;
    
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    updateTimer(); // Add this new line
    
    circles.forEach(circle => {
        if (!circle.active) return;
        
        // Move circle
        circle.x += circle.dx;
        circle.y += circle.dy;
        
        // Bounce off edges
        if (circle.x <= circle.radius || circle.x >= canvas.width - circle.radius) {
            circle.dx = -circle.dx;
        }
        if (circle.y <= circle.radius || circle.y >= canvas.height - circle.radius) {
            circle.dy = -circle.dy;
        }
    });
}

function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw active circles
    circles.forEach(circle => {
        if (circle.active) {
            ctx.fillStyle = 'brown';
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    updateUI(); // Add this line
}

// Initialize the game
function init() {
    console.log('10 Seconds initialized');
    
    // Reset game state
    gameOver = false;
    currentRound = 1;
    gameRunning = true;
    
    // Hide game over screen
    document.getElementById('game-over-screen').style.display = 'none';
    
    startRound();
    gameLoop();
    canvas.addEventListener('click', handleClick); // ADD THIS LINE
    
    // Add restart button handler
    document.getElementById('restart-btn').addEventListener('click', init);
}

function isPointInCircle(x, y, circle) {
    const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    return distance <= circle.radius;
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    circles.forEach(circle => {
        if (circle.active && isPointInCircle(clickX, clickY, circle)) {
            circle.active = false;
            console.log('Circle clicked!');
        }
    });
}

function startRound() {
    console.log(`Starting round ${currentRound}`);
    
    // Spawn circles for this round
    circles = [];
    for (let i = 0; i < currentRound; i++) {
        circles.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: Math.random() * (canvas.height - 40) + 20,
            dx: (Math.random() - 0.5) * 4,
            dy: (Math.random() - 0.5) * 4,
            radius: 20,
            active: true
        });
    }
    
    timeRemaining = 10;
    roundActive = true;
}

function updateTimer() {
    if (!roundActive) return;
    
    timeRemaining -= 1/60; // Assuming 60fps
    
    if (timeRemaining <= 0) {
        endRound(false); // Time's up
    }
    
    // Check if all circles eliminated
    const activeCircles = circles.filter(c => c.active);
    if (activeCircles.length === 0) {
        endRound(true); // Round complete
    }
}

function endRound(success) {
    roundActive = false;
    
    if (success) {
        console.log(`Round ${currentRound} complete!`);
        currentRound++;
        setTimeout(() => startRound(), 1500); // 1.5s delay
    } else {
        console.log('Game Over!');
        gameOver = true;
        finalRound = currentRound;
        gameRunning = false; // Stop the game loop
    }
}

function updateUI() {
    if (gameOver) {
        document.getElementById('game-over-screen').style.display = 'flex';
        document.getElementById('final-round-num').textContent = finalRound;
        return;
    }
    
    document.getElementById('round').textContent = `Round: ${currentRound}`;
    document.getElementById('timer-display').textContent = Math.ceil(timeRemaining);
    
    const activeCount = circles.filter(c => c.active).length;
    document.getElementById('circles-left').textContent = `Circles: ${activeCount}`;
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', init);