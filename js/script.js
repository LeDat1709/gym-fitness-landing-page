/**
 * PowerGym Website - Main JavaScript
 * Clean, modular, and optimized code
 */

// ============================================
// CONSTANTS & CONFIG
// ============================================
const CONFIG = {
    ANIMATION_DURATION: 800,
    SCROLL_OFFSET: 100,
    FORM_SUBMIT_DELAY: 2000,
    SCROLL_TOP_THRESHOLD: 500,
    HEADER_SCROLL_THRESHOLD: 100
};

const SELECTORS = {
    header: '.header',
    hamburger: '.hamburger',
    navMenu: '.nav-menu',
    navLinks: '.nav-menu a',
    ctaButtons: '.cta-btn, .hero-cta, .pricing-btn',
    contactForm: '.contact-form form',
    contactSection: '#contact',
    heroImage: '.hero-bg img'
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const scrollToElement = (element, offset = 0) => {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(phone.replace(/\s/g, ''));

// ============================================
// INITIALIZATION
// ============================================
const initAOS = () => {
    AOS.init({
        duration: CONFIG.ANIMATION_DURATION,
        easing: 'ease-in-out',
        once: true,
        offset: CONFIG.SCROLL_OFFSET
    });
};

// ============================================
// NAVIGATION
// ============================================
const initNavigation = () => {
    const hamburger = $(SELECTORS.hamburger);
    const navMenu = $(SELECTORS.navMenu);
    
    if (!hamburger || !navMenu) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    $$(SELECTORS.navLinks).forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
};

const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                const headerHeight = $(SELECTORS.header)?.offsetHeight || 0;
                scrollToElement(target, headerHeight);
            }
        });
    });
};

// ============================================
// HEADER EFFECTS
// ============================================
const initHeaderScroll = () => {
    const header = $(SELECTORS.header);
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > CONFIG.HEADER_SCROLL_THRESHOLD) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
};

// ============================================
// PARALLAX EFFECT
// ============================================
const initParallax = () => {
    const heroImage = $(SELECTORS.heroImage);
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, { passive: true });
};

// ============================================
// CTA BUTTONS
// ============================================
const initCTAButtons = () => {
    $$(SELECTORS.ctaButtons).forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = $(SELECTORS.contactSection);
            
            if (contactSection) {
                const headerHeight = $(SELECTORS.header)?.offsetHeight || 0;
                scrollToElement(contactSection, headerHeight);
                
                setTimeout(() => {
                    const firstInput = $(`${SELECTORS.contactForm} input`);
                    firstInput?.focus();
                }, 800);
            }
        });
    });
};

// ============================================
// FORM HANDLING
// ============================================
const initContactForm = () => {
    const form = $(SELECTORS.contactForm);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = form.querySelector('input[type="text"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const submitBtn = form.querySelector('.submit-btn');
        
        // Validation
        if (!name || !phone) {
            alert('Please fill in your name and phone number!');
            return;
        }
        
        if (!validatePhone(phone)) {
            alert('Invalid phone number!');
            return;
        }
        
        if (email && !validateEmail(email)) {
            alert('Invalid email address!');
            return;
        }
        
        // Submit
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            alert('Thank you for signing up! We will contact you shortly.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, CONFIG.FORM_SUBMIT_DELAY);
    });
};

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const initScrollToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)',
        color: '#000',
        border: 'none',
        borderRadius: '50%',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '1000'
    });
    
    document.body.appendChild(btn);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > CONFIG.SCROLL_TOP_THRESHOLD) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    }, { passive: true });
    
    // Click handler
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Hover effect
    btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
};

// ============================================
// LAZY LOADING
// ============================================
const initLazyLoading = () => {
    const images = $$('img[data-src]');
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// ============================================
// MAIN INITIALIZATION
// ============================================
const init = () => {
    // Core features
    initAOS();
    initNavigation();
    initSmoothScroll();
    initHeaderScroll();
    initParallax();
    initCTAButtons();
    initContactForm();
    initScrollToTop();
    initLazyLoading();
    
    console.log('PowerGym website loaded successfully! 💪');
};

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
