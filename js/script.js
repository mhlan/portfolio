// Main JavaScript file for Matt Lanin's portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all JavaScript functionality
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initFormValidation();
    initAnimations();
});

// Navbar functionality - change on scroll
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', function() {
        // Toggle hamburger menu animation
        hamburger.classList.toggle('active');
        // Toggle navigation menu
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                // Calculate the position to scroll to
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            // Validate name
            if (nameField.value.trim() === '') {
                showError(nameField, 'Name is required');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            // Validate email
            if (emailField.value.trim() === '') {
                showError(emailField, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailField.value)) {
                showError(emailField, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            // Validate subject
            if (subjectField.value.trim() === '') {
                showError(subjectField, 'Subject is required');
                isValid = false;
            } else {
                removeError(subjectField);
            }
            
            // Validate message
            if (messageField.value.trim() === '') {
                showError(messageField, 'Message is required');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For now, we'll just show a success message and reset the form
                showFormSuccess();
                contactForm.reset();
            }
        });
    }
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error message
function showError(field, message) {
    // Remove any existing error
    removeError(field);
    
    // Add error class to the field
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

// Helper function to remove error message
function removeError(field) {
    // Remove error class from the field
    field.classList.remove('error');
    
    // Remove any existing error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Helper function to show form success message
function showFormSuccess() {
    const contactForm = document.getElementById('contactForm');
    const formContainer = contactForm.parentNode;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Your message has been sent successfully!';
    
    // Hide the form
    contactForm.style.display = 'none';
    
    // Show success message
    formContainer.appendChild(successMessage);
    
    // After 3 seconds, remove success message and show form again
    setTimeout(() => {
        successMessage.remove();
        contactForm.style.display = 'block';
    }, 3000);
}

// Animations and effects
function initAnimations() {
    // Add fade-in animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .timeline-item, .project-card, .skill-card');
    
    // Create an observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Once animated, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add typing effect to hero section
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Add CSS for JavaScript-related styles
function addDynamicStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Animation classes */
        .section-title, .about-content, .timeline-item, .project-card, .skill-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-title.animate, .about-content.animate, .timeline-item.animate, 
        .project-card.animate, .skill-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Error and success message styles */
        .error {
            border-color: #ff4081 !important;
        }
        
        .error-message {
            color: #ff4081;
            font-size: 0.8rem;
            margin-top: 5px;
        }
        
        .success-message {
            background-color: rgba(0, 229, 255, 0.1);
            color: #00e5ff;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Call the function to add dynamic styles
addDynamicStyles();
