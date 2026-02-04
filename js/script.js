// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// CTA Button Actions
document.querySelectorAll('.cta-btn, .hero-cta, .pricing-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focus on first input after scroll
            setTimeout(() => {
                const firstInput = document.querySelector('.contact-form input');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 800);
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !phone) {
            alert('Vui lòng điền đầy đủ họ tên và số điện thoại!');
            return;
        }
        
        // Phone validation (Vietnamese format)
        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            alert('Số điện thoại không hợp lệ!');
            return;
        }
        
        // Email validation (if provided)
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Email không hợp lệ!');
                return;
            }
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'ĐANG GỬI...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-bg video');
    
    if (heroVideo && scrolled < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats (if you want to add stats section)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section if it exists
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Testimonials slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials every 5 seconds
if (testimonials.length > 1) {
    setInterval(nextTestimonial, 5000);
}

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Feature cards animation on hover
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Trainer cards flip effect
document.querySelectorAll('.trainer-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #FFD700 0%, #FF6B35 100%);
    color: #000;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// Performance optimization: Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Add loading animation to buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

console.log('PowerGym website loaded successfully! 💪');