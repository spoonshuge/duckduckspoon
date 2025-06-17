// Game canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game state
let gameRunning = false;

// Initialize the game
function init() {
    console.log('Duck Hunt initialized');
    
    // Set up canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent to show CSS background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Test drawing - simple moving circle
    drawTestCircle();
    
    gameRunning = true;
}

// Test function to verify canvas is working
function drawTestCircle() {
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(100, 100, 20, 0, Math.PI * 2);
    ctx.fill();
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', init);