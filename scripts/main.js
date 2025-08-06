/**
 * Main JavaScript file for Personal Portfolio Website
 * Handles navigation, dark mode, typing animation, and general interactions
 */

class PersonalPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.typingIndex = 0;
        this.typingTexts = [
            'Solutions Architect',
            'Professional Cat Dad',
            'Cloud Whisperer',
            'Integration Specialist',
            'Coffee-to-Solutions Converter',
            'Strategic Problem Solver'
        ];
        this.currentTextIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseTime = 2000;

        this.init();
    }

    init() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeDarkMode();
        this.startTypingAnimation();
        this.animateOnScroll();
    }

    initializeElements() {
        // Navigation elements
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        // Section elements
        this.sections = document.querySelectorAll('.section');
        
        // Dark mode toggle
        this.darkModeToggle = document.querySelector('#darkModeToggle');
        
        // Typing animation element
        this.typedTextElement = document.getElementById('typedText');
    }

    setupEventListeners() {
        // Navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
            });
        });

        // Logo navigation
        const logoLink = document.querySelector('.logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection('home');
            });
        }

        // CTA buttons navigation
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = button.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
            });
        });

        // Mobile menu toggle
        this.hamburger?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Dark mode toggle
        this.darkModeToggle?.addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu?.contains(e.target) && !this.hamburger?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window scroll for navbar styling
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });
    }

    navigateToSection(sectionId) {
        // Update active section
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Update active nav link
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Close mobile menu if open
        this.closeMobileMenu();

        // Trigger section-specific animations
        this.triggerSectionAnimation(sectionId);
    }

    toggleMobileMenu() {
        this.hamburger?.classList.toggle('active');
        this.navMenu?.classList.toggle('active');
    }

    closeMobileMenu() {
        this.hamburger?.classList.remove('active');
        this.navMenu?.classList.remove('active');
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode.toString());
        this.applyDarkMode();
    }

    initializeDarkMode() {
        this.applyDarkMode();
    }

    applyDarkMode() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    startTypingAnimation() {
        if (!this.typedTextElement) return;

        const typeText = () => {
            const currentText = this.typingTexts[this.currentTextIndex];
            
            if (this.isDeleting) {
                this.typedTextElement.textContent = currentText.substring(0, this.typingIndex - 1);
                this.typingIndex--;
            } else {
                this.typedTextElement.textContent = currentText.substring(0, this.typingIndex + 1);
                this.typingIndex++;
            }

            let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

            if (!this.isDeleting && this.typingIndex === currentText.length) {
                speed = this.pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.typingIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
            }

            setTimeout(typeText, speed);
        };

        typeText();
    }



    triggerSectionAnimation(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Add fade-in animation to section content
        const animatableElements = section.querySelectorAll(
            '.link-card, .gallery-item, .timeline-item, .fact-btn'
        );

        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    handleKeyboardNavigation(e) {
        const sections = ['home', 'links', 'gallery', 'career', 'facts'];
        const currentIndex = sections.indexOf(this.currentSection);

        switch(e.key) {
            case 'ArrowRight':
                if (e.altKey && currentIndex < sections.length - 1) {
                    e.preventDefault();
                    this.navigateToSection(sections[currentIndex + 1]);
                }
                break;
            case 'ArrowLeft':
                if (e.altKey && currentIndex > 0) {
                    e.preventDefault();
                    this.navigateToSection(sections[currentIndex - 1]);
                }
                break;
            case 'Escape':
                this.closeMobileMenu();
                break;
            case 'd':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.toggleDarkMode();
                }
                break;
        }
    }

    handleNavbarScroll() {
        if (window.scrollY > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    handleWindowResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }

        // Trigger layout recalculation for gallery
        if (this.currentSection === 'gallery') {
            this.recalculateGalleryLayout();
        }
    }

    recalculateGalleryLayout() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            // Force reflow
            galleryGrid.style.display = 'none';
            galleryGrid.offsetHeight; // Trigger reflow
            galleryGrid.style.display = '';
        }
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const elementsToObserve = document.querySelectorAll(
            '.link-card, .timeline-item, .gallery-item, .fact-btn'
        );

        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }

    // Utility method to show notifications
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'error' ? '#ef4444' : 
                           type === 'success' ? '#10b981' : '#3b82f6'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new PersonalPortfolio();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalPortfolio;
}
