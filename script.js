// ===== RUPANDE JAVASCRIPT ===== 
// Author: Kurrrrr Coder
// Mobile-optimized navbar and interactions

// ===== HAMBURGER MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow smooth scroll to work
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside navbar
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu) {
            if (!e.target.closest('.navbar')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Prevent menu close when clicking inside nav-menu
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// ===== SMOOTH SCROLL HELPER =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after navigation
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
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
    const originalText = element.textContent.trim();
    const numberMatch = originalText.match(/\d+/);
    
    if (!numberMatch) return;
    
    const target = parseInt(numberMatch[0]);
    const duration = 2000;
    const start = Date.now();
    const hasPercent = originalText.includes('%');
    const hasSlash = originalText.includes('/');
    
    function update() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
            const current = Math.floor(target * progress);
            let display = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            
            if (hasPercent) display += '%';
            if (hasSlash) display = originalText;
            
            element.textContent = display;
            requestAnimationFrame(update);
        } else {
            element.textContent = originalText;
        }
    }
    
    update();
}

// Observe all stat numbers on page load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stat-number').forEach(statNum => {
        observer.observe(statNum);
    });
});

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #d4af37;
        color: #001a4d;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 99;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🏛️ Selamat Datang di Rupande! 🏛️', 'color: #d4af37; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cPlatform Layanan Publik yang Transparan dan Profesional', 'color: #001a4d; font-size: 14px; font-weight: bold;');
console.log('%cKementerian Imigrasi dan Kepabeanan Republik Indonesia', 'color: #003d7a; font-size: 12px;');
console.log('%cUntuk informasi lebih lanjut, kunjungi: https://rupande.vercel.app', 'color: #666; font-size: 12px;');
