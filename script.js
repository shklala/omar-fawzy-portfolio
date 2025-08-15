// Mobile Navigation Toggle (supports .nav-toggle and .hamburger)
const navToggle = document.querySelector('.nav-toggle') || document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(7, 11, 22, 0.9)';
        navbar.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.background = 'rgba(7, 11, 22, 0.6)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send this data to your server
        console.log('Form submitted:', { name, email, subject, message });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Add to page
    document.body.appendChild(notification);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Matrix rain function (global)
function runMatrixRain(canvas, durationMs = 1000) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.opacity = '1';

    const fontSize = 16;
    const columns = Math.ceil(w / fontSize);
    const drops = new Array(columns).fill(0);
    const glyphs = 'アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let running = true;
    const start = performance.now();
    (function draw(now){
        if (!running) return; 
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#36fca1';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = glyphs[Math.floor(Math.random()*glyphs.length)] || '*';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        if (now - start < durationMs) {
            requestAnimationFrame(draw);
        } else {
            running = false;
            canvas.style.opacity = '0';
            setTimeout(() => { ctx.clearRect(0,0,w,h); }, 250);
        }
    })(performance.now());
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    // Start screen: wait for any key/click to start
    const startScreen = document.getElementById('startScreen');
    const matrixCanvas = document.getElementById('matrixRain');
    if (startScreen && document.body.classList.contains('prestart')) {
        const startGame = () => {
            // Play transition
            document.body.classList.add('starting');
            // After start, type-in effect for marked nodes
            const typeTargets = document.querySelectorAll('[data-type-on-start="true"]');
            const originals = Array.from(typeTargets).map(el => el.textContent);
            typeTargets.forEach(el => el.textContent = '');
            setTimeout(() => {
                document.body.classList.remove('prestart');
                document.body.classList.remove('starting');
                document.body.classList.add('started');
                startScreen.setAttribute('aria-hidden', 'true');
                // sequential typing
                let idx = 0;
                function typeNext() {
                    if (idx >= typeTargets.length) return;
                    const el = typeTargets[idx];
                    const text = originals[idx] || '';
                    let i = 0;
                    const speed = Math.max(20, 120 - text.length); // shorter text types slower
                    const timer = setInterval(() => {
                        el.textContent = text.slice(0, i++);
                        if (i > text.length) { clearInterval(timer); idx++; setTimeout(typeNext, 120); }
                    }, speed);
                }
                typeNext();
            }, 850);
        };
        const oneShot = () => { startGame(); window.removeEventListener('keydown', oneShot); window.removeEventListener('mousedown', oneShot); window.removeEventListener('touchstart', oneShot); };
        window.addEventListener('keydown', oneShot, { once: true });
        window.addEventListener('mousedown', oneShot, { once: true });
        window.addEventListener('touchstart', oneShot, { once: true });
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.setAttribute('data-text', originalText);
        typeWriter(heroTitle, originalText, 120);

        // Stable neon flicker: brief, subtle global glow pulse
        const pulse = () => {
            heroTitle.style.filter = 'drop-shadow(0 0 8px #7c3aed) drop-shadow(0 0 16px #60a5fa)';
            setTimeout(() => {
                heroTitle.style.filter = 'drop-shadow(0 0 4px #7c3aed) drop-shadow(0 0 10px #60a5fa)';
            }, 140);
        };
        setTimeout(() => setInterval(pulse, 1200), originalText.length * 120 + 200);
    }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Timeline items animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'OMF';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3rem;
        font-weight: 700;
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.1);
        }
    }
`;
document.head.appendChild(loadingStyles);

// Scroll progress indicator (use existing element if present)
let progressBar = document.getElementById('progressBar');
if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    document.body.appendChild(progressBar);
}
progressBar.style.width = '0%';

window.addEventListener('scroll', () => {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Back to top button (use existing element with id="backToTop")
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Hover effects via inline for subtle lift
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px)';
        backToTopBtn.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });
}

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to elements as they come into view
    const fadeElements = document.querySelectorAll('.skill-category, .education-item, .cert-item');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        fadeObserver.observe(element);
    });

    // Typing-on-scroll: apply a quick typewriter effect to elements
    // Mark any element with attribute: data-type-on-scroll (optional value = speed ms per char)
    const scrollTypeTargets = document.querySelectorAll('[data-type-on-scroll]');
    // Preserve original text and clear until typed
    scrollTypeTargets.forEach(el => {
        if (!el.dataset.originalText) {
            el.dataset.originalText = el.textContent || '';
            el.textContent = '';
        }
    });

    function typeInElement(el, text, speedMs) {
        if (el.dataset.typed === '1') return;
        let i = 0;
        const len = text.length;
        const timer = setInterval(() => {
            el.textContent = text.slice(0, ++i);
            if (i >= len) {
                clearInterval(timer);
                el.dataset.typed = '1';
            }
        }, speedMs);
    }

    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const text = el.dataset.originalText || '';
            const speed = Number(el.getAttribute('data-type-on-scroll')) || 18; // fast by default
            typeInElement(el, text, speed);
            typingObserver.unobserve(el);
        });
    }, { threshold: 0.2 });

    scrollTypeTargets.forEach(el => typingObserver.observe(el));

    // Gamification: XP system (with level up)
    const xpFill = document.getElementById('xpFill');
    const xpText = document.getElementById('playerXP');
    const levelText = document.getElementById('playerLevel');
    let currentXP = 0;
    let xpTarget = 7800; // initial progress baseline
    let xpMax = 10000;
    let currentLevel = 12;
    function updateXPUI() {
        if (!xpFill || !xpText) return;
        const pct = Math.max(0, Math.min(100, (currentXP / xpMax) * 100));
        xpFill.style.width = pct + '%';
        xpText.textContent = currentXP + ' / ' + xpMax;
        if (levelText) levelText.textContent = String(currentLevel);
    }
    function addXP(points) {
        currentXP += points;
        // handle level ups
        while (currentXP >= xpMax) {
            currentXP -= xpMax;
            currentLevel += 1;
        }
        updateXPUI();
    }
    if (xpFill && xpText && levelText) {
        currentLevel = 12;
        currentXP = xpTarget; // set immediate baseline to avoid conflicts with rewards
        updateXPUI();
    }

    // Gamification: coins, streaks, xp toasts
    const coinChip = document.getElementById('coinCount');
    const streakChip = document.getElementById('streakCount');
    const xpToast = document.getElementById('xpToast');
    let coins = 0;
    let streak = 0;

    function showXP(amount) {
        if (!xpToast) return;
        xpToast.textContent = `+${amount} XP`;
        xpToast.classList.add('show');
        setTimeout(() => xpToast.classList.remove('show'), 900);
    }

    function reward(amount = 10) {
        coins += amount;
        streak += 1;
        if (coinChip) coinChip.textContent = coins.toString();
        if (streakChip) streakChip.textContent = streak.toString();
        const gained = amount * 5;
        addXP(gained);
        showXP(gained);
    }

    // Reward on section view
    const rewardObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            const started = document.body.classList.contains('started');
            if (e.isIntersecting && started) {
                reward(5);
                rewardObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('section').forEach(sec => rewardObserver.observe(sec));

    // Cursor trail (performance-friendly, small count)
    let lastTrail = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrail < 25) return; // throttle
        lastTrail = now;
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 350);
    });

    // Shooting stars over skills
    const skillStars = document.querySelectorAll('.skill-stars');
    const spawnStar = (container) => {
        const star = document.createElement('div');
        star.className = 'skill-star';
        const x = Math.random() * (container.parentElement.clientWidth - 10) + 5;
        star.style.left = x + 'px';
        star.style.top = '0px';
        container.appendChild(star);
        const dy = 80 + Math.random() * 140;
        const dx = (Math.random() - 0.5) * 80;
        star.animate([
            { transform: 'translate(0, 0)', opacity: 0.9 },
            { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
        ], { duration: 1500 + Math.random() * 1000, easing: 'ease-out' });
        setTimeout(() => star.remove(), 1800);
    };
    setInterval(() => {
        skillStars.forEach(c => { if (Math.random() < 0.4) spawnStar(c); });
    }, 700);

    // Starfield background
    const canvas = document.getElementById('bgStars');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
        const layers = [[], [], []];

        function resize() {
            width = window.innerWidth; height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', () => { resize(); spawnStars(); });

        function spawnStars() {
            layers[0] = Array.from({ length: Math.max(80, Math.floor(width * height / 9000)) }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 0.8 + 0.2, tw: Math.random() }));
            layers[1] = Array.from({ length: Math.max(50, Math.floor(width * height / 14000)) }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.2 + 0.4, tw: Math.random() }));
            layers[2] = Array.from({ length: Math.max(30, Math.floor(width * height / 22000)) }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.6 + 0.6, tw: Math.random() }));
        }
        spawnStars();

        let t = 0; let last = performance.now();
        function draw(now) {
            const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
            ctx.clearRect(0, 0, width, height);
            const scrollY = window.scrollY || 0;
            const parallax = [0.15, 0.3, 0.45];
            const colors = ['#93c5fd', '#a5b4fc', '#c7d2fe'];
            for (let i = 0; i < layers.length; i++) {
                ctx.fillStyle = colors[i];
                for (const s of layers[i]) {
                    const y = s.y + scrollY * parallax[i];
                    const twinkle = 0.5 + 0.5 * Math.sin((t * (1.5 + i*0.5) + s.tw * 6.28));
                    ctx.globalAlpha = 0.2 + twinkle * 0.8;
                    ctx.beginPath();
                    ctx.arc(s.x, (y % (height + 5)), s.r + i*0.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;

            // occasional shooting star
            if (Math.random() < 0.03) {
                const sx = Math.random() * width; let sy = Math.random() * height * 0.4;
                const vx = -200 - Math.random() * 200; const vy = 120 + Math.random() * 160;
                const len = 450 + Math.random() * 250; let life = 0;
                const trail = () => {
                    life += dt; const p = Math.min(1, life * 1.5);
                    ctx.save();
                    ctx.globalCompositeOperation = 'lighter';
                    const x = sx + vx * life; const y = sy + vy * life;
                    const grad = ctx.createLinearGradient(x, y, x - len * 0.6, y - len * 0.3);
                    grad.addColorStop(0, 'rgba(147,197,253,0.8)');
                    grad.addColorStop(1, 'rgba(147,197,253,0)');
                    ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.beginPath();
                    ctx.moveTo(x, y); ctx.lineTo(x - len * p, y - len * p * 0.5); ctx.stroke();
                    ctx.restore();
                };
                const shots = 26;
                (function shootStep(step){ if (step<=shots){ trail(); requestAnimationFrame(()=>shootStep(step+1)); } }) (0);
            }
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }

    // Matrix rain function
    function runMatrixRain(canvas, durationMs = 1000) {
        const ctx = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let w = window.innerWidth, h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        canvas.style.opacity = '1';

        const fontSize = 16;
        const columns = Math.ceil(w / fontSize);
        const drops = new Array(columns).fill(0);
        const glyphs = 'アイウエオカキクケコｱｲｳｴｵｶｷｸｹｺ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        let running = true;
        const start = performance.now();
        (function draw(now){
            if (!running) return; 
            ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#36fca1';
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = glyphs[Math.floor(Math.random()*glyphs.length)] || '*';
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            if (now - start < durationMs) {
                requestAnimationFrame(draw);
            } else {
                running = false;
                canvas.style.opacity = '0';
                setTimeout(() => { ctx.clearRect(0,0,w,h); }, 250);
            }
        })(performance.now());
    }
});
