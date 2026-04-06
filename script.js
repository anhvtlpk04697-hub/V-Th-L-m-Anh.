// ==========================================
// 🎉 CONFETTI & BUBBLES - Fun Teen Background
// ==========================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Colorful floating shapes
const shapes = [];
const colors = ['#FF6B9D', '#C084FC', '#00D4FF', '#FFD93D', '#6EE7B7', '#FB923C', '#FF7EB3'];

class FloatingShape {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20 + Math.random() * 100;
        this.size = Math.random() * 12 + 4;
        this.speedY = -(Math.random() * 0.8 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.25 + 0.08;
        this.shape = Math.floor(Math.random() * 4); // 0=circle, 1=star, 2=heart, 3=square
        this.wobblePhase = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }
    update() {
        this.y += this.speedY;
        this.wobblePhase += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobblePhase) * 0.5;
        this.rotation += this.rotationSpeed;
        
        if (this.y < -30) this.reset();
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        switch (this.shape) {
            case 0: // Circle
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 1: // Star
                this.drawStar(0, 0, 5, this.size, this.size * 0.5);
                break;
            case 2: // Heart
                this.drawHeart(0, 0, this.size);
                break;
            case 3: // Rounded square
                const r = this.size * 0.3;
                ctx.beginPath();
                ctx.roundRect(-this.size, -this.size, this.size * 2, this.size * 2, r);
                ctx.fill();
                break;
        }
        
        ctx.restore();
    }
    drawStar(cx, cy, spikes, outerR, innerR) {
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerR);
        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
            rot += step;
            ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerR);
        ctx.closePath();
        ctx.fill();
    }
    drawHeart(cx, cy, size) {
        ctx.beginPath();
        const s = size * 0.6;
        ctx.moveTo(cx, cy + s * 0.4);
        ctx.bezierCurveTo(cx, cy - s * 0.2, cx - s, cy - s * 0.6, cx - s, cy);
        ctx.bezierCurveTo(cx - s, cy + s * 0.5, cx, cy + s * 0.8, cx, cy + s);
        ctx.bezierCurveTo(cx, cy + s * 0.8, cx + s, cy + s * 0.5, cx + s, cy);
        ctx.bezierCurveTo(cx + s, cy - s * 0.6, cx, cy - s * 0.2, cx, cy + s * 0.4);
        ctx.fill();
    }
}

// Rainbow wave across bottom
class RainbowWave {
    constructor(baseY, color, amplitude, offset) {
        this.baseY = baseY;
        this.color = color;
        this.amplitude = amplitude;
        this.offset = offset;
        this.speed = 0.002;
    }
    draw(time) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 4) {
            const y = this.baseY + 
                Math.sin((x * 0.003) + (time * this.speed) + this.offset) * this.amplitude +
                Math.sin((x * 0.005) + (time * this.speed * 1.3)) * (this.amplitude * 0.3);
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize shapes
const shapeCount = Math.min(50, Math.floor(window.innerWidth * 0.035));
for (let i = 0; i < shapeCount; i++) {
    const shape = new FloatingShape();
    shape.y = Math.random() * canvas.height; // Start scattered
    shapes.push(shape);
}

// Rainbow waves at the very bottom  
const waves = [
    new RainbowWave(canvas.height - 40, 'rgba(255, 107, 157, 0.04)', 20, 0),
    new RainbowWave(canvas.height - 25, 'rgba(192, 132, 252, 0.03)', 15, 2),
    new RainbowWave(canvas.height - 10, 'rgba(0, 212, 255, 0.03)', 12, 4),
];

let time = 0;

function animate() {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw waves
    waves.forEach(w => w.draw(time));
    
    // Draw shapes
    shapes.forEach(s => {
        s.update();
        s.draw();
    });
    
    requestAnimationFrame(animate);
}
animate();

// ==========================================
// Navbar
// ==========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
}
window.addEventListener('scroll', updateActiveLink);

// ==========================================
// Typewriter - Fun with emoji
// ==========================================
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Sinh viên FPT Polytechnic 🎓',
    'Yêu thích sáng tạo 🎨',
    'Năng động & Nhiệt huyết 🔥',
    'MSSV: PK04687 ✨',
    'Luôn tươi cười mỗi ngày 😊',
    'Đam mê công nghệ 💻'
];
let phraseIdx = 0, charIdx = 0, isDeleting = false, typeSpeed = 65;

function typeWriter() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 30;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 65 + Math.random() * 40;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}
typeWriter();

// ==========================================
// Scroll Reveal - Bouncy
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================
// Counter Animation - Bouncy counting
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target, parseInt(entry.target.dataset.count));
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();
    
    function easeOutBounce(t) {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
    
    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutBounce(progress);
        el.textContent = Math.floor(easedProgress * target);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target;
            // Celebrate with a pop
            el.style.transform = 'scale(1.2)';
            setTimeout(() => el.style.transform = 'scale(1)', 200);
        }
    }
    
    requestAnimationFrame(step);
}

// ==========================================
// Skill Bar Animation
// ==========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.width = entry.target.dataset.width + '%';
            }, 150);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==========================================
// Jelly Hover Effect on Cards
// ==========================================
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'jellyBounce 0.5s ease';
    });
    card.addEventListener('animationend', () => {
        card.style.animation = '';
    });
});

// Add jelly keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes jellyBounce {
        0% { transform: scale(1); }
        30% { transform: scale(1.04, 0.96); }
        50% { transform: scale(0.98, 1.02); }
        70% { transform: scale(1.02, 0.98); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ==========================================
// Emoji Confetti on Scroll Past Hero
// ==========================================
let confettiTriggered = false;
window.addEventListener('scroll', () => {
    if (!confettiTriggered && window.scrollY > window.innerHeight * 0.5) {
        confettiTriggered = true;
        createConfettiBurst();
    }
});

function createConfettiBurst() {
    const emojis = ['🌟', '💖', '✨', '🎉', '🌈', '💫', '🦋', '🌸'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                top: ${Math.random() * 40}%;
                left: ${Math.random() * 100}%;
                font-size: ${Math.random() * 20 + 16}px;
                z-index: 9999;
                pointer-events: none;
                animation: confettiFall 2.5s ease-out forwards;
            `;
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 2500);
        }, i * 80);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
        50% { opacity: 0.8; }
        100% { opacity: 0; transform: translateY(200px) rotate(720deg) scale(0.3); }
    }
`;
document.head.appendChild(confettiStyle);

// ==========================================
// Contact Form
// ==========================================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '🎉 Gửi thành công rồi nè!';
    btn.style.background = 'linear-gradient(135deg, #6EE7B7, #00D4FF)';
    btn.style.boxShadow = '0 6px 24px rgba(110, 231, 183, 0.4)';
    
    // Create mini confetti
    createConfettiBurst();
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.boxShadow = '';
        contactForm.reset();
    }, 3000);
});

// ==========================================
// Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ==========================================
// Fun Parallax on Hero
// ==========================================
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.12}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.9));
    }
});
