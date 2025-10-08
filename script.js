// Get elements
const countDisplay = document.getElementById('count-display');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');

// Initialize counter
let count = 0;

// Update display with animation
function updateDisplay() {
    countDisplay.textContent = count;
    
    // Add scale animation
    countDisplay.style.transform = 'scale(1.3) rotateY(360deg)';
    countDisplay.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    setTimeout(() => {
        countDisplay.style.transform = 'scale(1) rotateY(0deg)';
    }, 500);
    
    // Add color pulse based on value
    if (count > 0) {
        countDisplay.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))';
    } else if (count < 0) {
        countDisplay.style.filter = 'drop-shadow(0 0 20px rgba(255, 0, 255, 0.8))';
    } else {
        countDisplay.style.filter = 'drop-shadow(0 0 15px rgba(138, 43, 226, 0.6))';
    }
}

// Increment by 1
incrementBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
    createParticles(incrementBtn, '#00f2fe');
});

// Decrement by 1
decrementBtn.addEventListener('click', () => {
    count--;
    updateDisplay();
    createParticles(decrementBtn, '#8a2be2');
});

// Reset counter
resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
    createParticles(resetBtn, '#ff00ff');
});

// Particle effect function
function createParticles(button, color) {
    const rect = button.getBoundingClientRect();
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        const animate = () => {
            posX += vx * 0.016;
            posY += vy * 0.016;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Initialize display
updateDisplay();
