document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Enhanced Particle class with neural network properties
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.connections = [];
            this.maxConnections = 1;
            this.activation = 0;
            this.color = `rgba(74, 144, 226, ${Math.random() * 0.5 + 0.1})`;
            this.pulseSpeed = Math.random() * 0.01;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off walls
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            
            // Update activation (pulse effect)
            this.activation = Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.5 + 0.5;
            
            // Clear old connections
            this.connections = [];
        }
        
        draw() {
            // Draw particle with pulse effect
            const size = this.size * (1 + this.activation * 0.5);
            ctx.fillStyle = `rgba(74, 144, 226, ${0.3 + this.activation * 0.2})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#4a90e2';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        
        drawConnections(particles) {
            // Sort particles by distance
            const sortedParticles = particles
                .filter(p => p !== this)
                .sort((a, b) => {
                    const distA = Math.hypot(this.x - a.x, this.y - a.y);
                    const distB = Math.hypot(this.x - b.x, this.y - b.y);
                    return distA - distB;
                });
            
            // Connect to nearest particles
            for (let i = 0; i < Math.min(this.maxConnections, sortedParticles.length); i++) {
                const particle = sortedParticles[i];
                const distance = Math.hypot(this.x - particle.x, this.y - particle.y);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * (0.2 + this.activation * 0.1);
                    ctx.strokeStyle = `rgba(74, 144, 226, ${opacity})`;
                    ctx.lineWidth = 1 + this.activation;
                    
                    // Draw curved connection
                    ctx.beginPath();
                    const midX = (this.x + particle.x) / 2;
                    const midY = (this.y + particle.y) / 2;
                    const controlX = midX + (Math.random() - 0.5) * 50;
                    const controlY = midY + (Math.random() - 0.5) * 50;
                    
                    ctx.moveTo(this.x, this.y);
                    ctx.quadraticCurveTo(controlX, controlY, particle.x, particle.y);
                    ctx.stroke();
                    
                    // Add to connections
                    this.connections.push(particle);
                }
            }
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = 80; // Reduced for better visibility
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach(particle => {
            particle.drawConnections(particles);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}); 