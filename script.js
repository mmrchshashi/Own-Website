// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Account for fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .exp-item, .contact-method');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Captcha functionality
let currentCaptcha = '';

function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    return captcha;
}

function displayCaptcha() {
    const captchaDisplay = document.getElementById('captchaDisplay');
    if (captchaDisplay) {
        captchaDisplay.textContent = generateCaptcha();
    }
}

// Contact form handling with captcha verification for mail app
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Initialize captcha
    displayCaptcha();
    
    // Refresh captcha button
    const refreshCaptchaBtn = document.getElementById('refreshCaptcha');
    if (refreshCaptchaBtn) {
        refreshCaptchaBtn.addEventListener('click', displayCaptcha);
    }
    
    // Open mail app button with captcha verification
    const openMailAppBtn = document.getElementById('openMailApp');
    if (openMailAppBtn) {
        openMailAppBtn.addEventListener('click', function() {
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const captchaInput = formData.get('captcha');
            
            // Clear previous error states
            clearFormErrors();
            
            // Validation
            let hasErrors = false;
            
            if (!name || !email || !subject || !message || !captchaInput) {
                showFieldError('Please fill in all fields', 'general');
                hasErrors = true;
            }
            
            if (!isValidEmail(email)) {
                showFieldError('Please enter a valid email address', 'email');
                hasErrors = true;
            }
            
            if (captchaInput !== currentCaptcha) {
                showFieldError('Captcha verification failed. Please try again.', 'captcha');
                hasErrors = true;
                displayCaptcha(); // Generate new captcha
                document.getElementById('captcha').value = '';
                return;
            }
            
            if (hasErrors) {
                return;
            }
            
            // Show loading state
            openMailAppBtn.disabled = true;
            openMailAppBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Mail App...';
            
            // Create mailto link with form data
            const mailtoLink = `mailto:mmrchshashi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open mail app
            window.open(mailtoLink);
            
            // Reset form and captcha after opening mail app
            setTimeout(() => {
                contactForm.reset();
                displayCaptcha();
                
                // Reset button state
                openMailAppBtn.disabled = false;
                openMailAppBtn.innerHTML = '<i class="fas fa-envelope"></i> Open Mail App';
                
                // Show success message
                showNotification('Mail app opened successfully! Please send your message manually.', 'success');
                
                // Log for development (no actual submission)
                console.log('Mail App Opened:', {
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date().toISOString(),
                    note: 'No email sent - user must send manually'
                });
            }, 1000);
        });
    }
    
    // Prevent form submission (since we don't want automated emails)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Please use the "Open Mail App" button to send your message.', 'info');
    });
}

// Form error handling
function showFieldError(message, field) {
    const fieldElement = field === 'general' ? contactForm : document.getElementById(field);
    if (fieldElement) {
        fieldElement.classList.add('error');
        
        // Remove existing error message
        const existingError = fieldElement.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        fieldElement.parentNode.appendChild(errorDiv);
    }
}

function clearFormErrors() {
    const errorElements = contactForm.querySelectorAll('.error');
    errorElements.forEach(el => el.classList.remove('error'));
    
    const errorMessages = contactForm.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
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
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
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
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Add a small delay to let the page load first
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
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

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        console.log('Loading image:', img.src);
        
        img.addEventListener('load', () => {
            console.log('Image loaded successfully:', img.src);
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', (e) => {
            console.error('Image failed to load:', img.src, e);
            // Fallback for failed image loads
            img.style.display = 'none';
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'profile-pic-fallback';
            fallbackDiv.innerHTML = '<i class="fas fa-user"></i>';
            fallbackDiv.style.cssText = `
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                color: rgba(255, 255, 255, 0.8);
                border: 4px solid rgba(255, 255, 255, 0.3);
                margin-bottom: 1.5rem;
            `;
            img.parentNode.insertBefore(fallbackDiv, img);
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Force image load check
        if (img.complete) {
            if (img.naturalWidth === 0) {
                console.log('Image has no natural width, triggering error event');
                img.dispatchEvent(new Event('error'));
            } else {
                console.log('Image already loaded:', img.src);
                img.style.opacity = '1';
            }
        }
        
        // Additional debugging for profile image
        if (img.classList.contains('profile-pic')) {
            console.log('Profile image details:');
            console.log('- Source:', img.src);
            console.log('- Complete:', img.complete);
            console.log('- Natural width:', img.naturalWidth);
            console.log('- Natural height:', img.naturalHeight);
            console.log('- Current width:', img.width);
            console.log('- Current height:', img.height);
        }
    });
});

// Add hover effects for skill cards
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-revealed');
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

revealSections.forEach(section => {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
});

// Add CSS for section reveal animation
if (!document.querySelector('#section-animations')) {
    const style = document.createElement('style');
    style.id = 'section-animations';
    style.textContent = `
        .section--hidden {
            opacity: 0;
            transform: translateY(8rem);
            transition: all 1s;
        }
        
        .section-revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }
}, 100));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Skip to main content link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Add service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
