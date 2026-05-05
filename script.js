// ===== RUPANDE JAVASCRIPT ===== 
// Author: Kurrrrr Coder

// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && !e.target.closest('.nav-menu-bar')) {
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
    const text = element.textContent;
    const target = parseInt(text.replace(/,/g, '').replace('%', '').match(/\d+/)[0]);
    const isPercent = text.includes('%');
    const duration = 2000;
    const start = Date.now();
    
    function update() {
        const progress = (Date.now() - start) / duration;
        if (progress < 1) {
            const current = Math.floor(target * progress);
            let display = current.toString();
            
            // Add comma separator for numbers
            display = display.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            
            // Add percentage if needed
            if (isPercent) {
                display += '%';
            }
            
            element.textContent = display;
            requestAnimationFrame(update);
        } else {
            element.textContent = text; // Restore original
        }
    }
    
    update();
}

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(statNum => {
    observer.observe(statNum);
});

// ===== SCROLL-TO-TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    display: none;
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #001a4d 0%, #003d7a 100%);
    color: #d4af37;
    border: 2px solid #d4af37;
    padding: 10px 15px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    z-index: 99;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🏛️ Selamat Datang di Rutan Kelas II B Pandeglang! 🏛️', 'color: #d4af37; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cPlatform Layanan Publik yang Transparan dan Profesional', 'color: #001a4d; font-size: 14px; font-weight: bold;');
console.log('%cUntuk informasi lebih lanjut, kunjungi: https://rupande.vercel.app', 'color: #666; font-size: 12px;');
