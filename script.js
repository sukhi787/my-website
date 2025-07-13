// Add at the very top of your existing JavaScript
window.addEventListener('load', function() {
  setTimeout(function() {
    document.body.classList.add('loaded');
  }, 1000); // 1 second loading time
});

document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor effects on hover (including iframe)
    const hoverElements = document.querySelectorAll('a, button, .expertise-card, .regulation, .step, .score-card, .info-item, .map-iframe');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(58, 123, 213, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations (including iframe container)
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const sections = document.querySelectorAll('section');
    const expertiseCards = document.querySelectorAll('.expertise-card');
    const auditsContent = document.querySelector('.audits-content');
    const auditsImage = document.querySelector('.audits-image');
    const contactForm = document.querySelector('.contact-form');
    const sectionTitles = document.querySelectorAll('h2');
    const regulations = document.querySelectorAll('.regulation');
    const heroImage = document.querySelector('.hero-image'); // For iframe container
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    expertiseCards.forEach(card => {
        observer.observe(card);
    });
    
    regulations.forEach(regulation => {
        observer.observe(regulation);
    });
    
    if (auditsContent) observer.observe(auditsContent);
    if (auditsImage) observer.observe(auditsImage);
    if (contactForm) observer.observe(contactForm);
    if (heroImage) observer.observe(heroImage); // Observe iframe container
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Update copyright year
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Form submission
    const contactFormElement = document.querySelector('.contact-form');
    if (contactFormElement) {
        contactFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your consultation request! I will contact you soon to discuss your compliance needs.');
            contactFormElement.reset();
        });
    }

    // Iframe-specific functionality
    const usaMapIframe = document.querySelector('.map-iframe');
    if (usaMapIframe) {
        // Iframe load event
        usaMapIframe.addEventListener('load', function() {
            console.log('USA Map iframe loaded successfully');
            // You could add a loading spinner removal here if needed
        });

        // Error handling
        usaMapIframe.addEventListener('error', function() {
            console.error('Failed to load USA Map iframe');
            // Optional: Show fallback content
        });

        // Cross-origin communication (if needed)
        window.addEventListener('message', function(event) {
            // Verify the message is from the expected origin
            if (event.origin === 'https://token-ed.github.io') {
                console.log('Received data from map:', event.data);
                // Handle map interactions here
            }
        });
    }
});