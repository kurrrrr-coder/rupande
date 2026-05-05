// ===== RUPANDE JAVASCRIPT ===== 
// Author: Kurrrrr Coder

// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== SMOOTH SCROLL HELPER =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== COUNTER ANIMATION FOR STATS =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/,/g, '').match(/\d+/)[0]);
    const duration = 2000;
    const start = Date.now();
    
    function update() {
        const progress = (Date.now() - start) / duration;
        if (progress < 1) {
            const current = Math.floor(target * progress);
            let display = current.toString();
            
            // Add comma separator for numbers
            display = display.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            
            // Preserve % or other suffixes
            if (element.textContent.includes('%')) {
                display += '%';
            } else if (element.textContent.includes('/')) {
                display = element.textContent.split('/')[0];
            }
            
            element.textContent = display;
            requestAnimationFrame(update);
        } else {
            element.textContent = element.textContent.split(' ')[0]; // Restore original
            animateCounter(element); // This will be called after initial animation
        }
    }
    
    update();
}

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(statNum => {
    observer.observe(statNum);
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🏛️ Selamat Datang di Rupande! 🏛️', 'color: #d4af37; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cPlatform Layanan Publik yang Transparan dan Profesional', 'color: #001a4d; font-size: 14px; font-weight: bold;');
console.log('%cUntuk informasi lebih lanjut, kunjungi: https://rupande.vercel.app', 'color: #666; font-size: 12px;');
