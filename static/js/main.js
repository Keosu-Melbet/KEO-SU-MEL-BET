// Main JavaScript file for MelBet landing page

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupSmoothScrolling();
    setupFormValidation();
    setupChatbot();
    setupAnimations();
});

// Initialize page functions
function initializePage() {
    // Add loading class for fade-in animation
    document.body.classList.add('loading');
    
    // Log page load for analytics
    console.log('MelBet Landing Page Loaded');
    
    // Set referral code
    const referralInput = document.getElementById('referralCode');
    if (referralInput) {
        referralInput.value = 'ml_1498999';
    }
}

// Setup smooth scrolling for navigation
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // Phone validation
    phoneInput.addEventListener('input', function() {
        const phone = this.value.replace(/\D/g, '');
        if (phone.length > 10) {
            this.value = phone.substring(0, 10);
        }
        validatePhone(this);
    });

    // Email validation
    emailInput.addEventListener('blur', function() {
        validateEmail(this);
    });
}

// Phone validation function
function validatePhone(input) {
    const phone = input.value.replace(/\D/g, '');
    const isValid = phone.length >= 9 && phone.length <= 10;
    
    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else if (phone.length > 0) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
    
    return isValid;
}

// Email validation function
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    
    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else if (input.value.length > 0) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
    
    return isValid;
}

// Open registration form
function openForm(language) {
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    // Validate inputs
    const phoneValid = validatePhone(phoneInput);
    const emailValid = validateEmail(emailInput);
    
    if (!phoneValid || !emailValid) {
        showNotification('Vui lòng điền đầy đủ thông tin hợp lệ!', 'error');
        return;
    }
    
    // Open appropriate form
    let formUrl;
    if (language === 'vn') {
        formUrl = 'https://forms.gle/HM6AZVQo5hvX13kJ9';
    } else {
        formUrl = 'https://forms.gle/R3cZfUfcNTQsr7r27';
    }
    
    // Pre-fill form parameters
    const params = new URLSearchParams({
        'entry.phone': phoneInput.value,
        'entry.email': emailInput.value,
        'entry.referral': 'ml_1498999'
    });
    
    // Open form in new tab
    window.open(formUrl, '_blank');
    
    // Show success message
    showNotification('Đang mở form đăng ký...', 'success');
    
    // Track form opening
    trackEvent('form_open', { language: language });
}

// Setup chatbot functionality
function setupChatbot() {
    // Ensure chatbot is loaded
    if (typeof window.difyChatbotConfig !== 'undefined') {
        console.log('Dify Chatbot initialized with token: xhJuB06Ye6hfb3s5');
    }
    
    // Add chatbot open event tracking
    setTimeout(() => {
        const chatButton = document.getElementById('xhJuB06Ye6hfb3s5');
        if (chatButton) {
            chatButton.addEventListener('click', function() {
                trackEvent('chatbot_open');
            });
        }
    }, 2000);
}

// Open chat with predefined message
function openChat(message) {
    // Track predefined question
    trackEvent('predefined_question', { question: message });
    
    // Try to open chatbot with message
    try {
        // Click the chatbot button first
        const chatButton = document.querySelector('#xhJuB06Ye6hfb3s5');
        if (chatButton) {
            chatButton.click();
            
            // Wait for chatbot to load and then send message
            setTimeout(() => {
                const chatInput = document.querySelector('#dify-chatbot-bubble-window input[type="text"]');
                if (chatInput) {
                    chatInput.value = message;
                    chatInput.dispatchEvent(new Event('input', { bubbles: true }));
                    
                    // Try to find and click send button
                    const sendButton = document.querySelector('#dify-chatbot-bubble-window button[type="submit"]');
                    if (sendButton) {
                        sendButton.click();
                    }
                }
            }, 1500);
        } else {
            // Fallback: show message to copy
            showNotification(`Hỏi chatbot: "${message}"`, 'info');
        }
    } catch (error) {
        console.error('Chatbot interaction error:', error);
        showNotification('Đang mở chatbot...', 'info');
    }
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.chat-guide-card, .registration-card, .wheel-container');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Track events for analytics
function trackEvent(eventName, properties = {}) {
    // Console log for development
    console.log('Event tracked:', eventName, properties);
    
    // Here you can add Google Analytics, Facebook Pixel, or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        trackEvent('page_visible');
    } else {
        trackEvent('page_hidden');
    }
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    trackEvent('page_unload');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(() => {
        if ('performance' in window) {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            trackEvent('page_performance', {
                load_time: loadTime,
                dom_ready: perfData.domContentLoadedEventEnd - perfData.navigationStart
            });
        }
    }, 0);
});
