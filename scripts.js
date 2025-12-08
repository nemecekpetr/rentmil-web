/**
 * Rentmil.cz - JavaScript
 * Bazénový Zen
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();

    // Megamenu Enhancement
    initMegamenu();

    // Smooth Scroll
    initSmoothScroll();

    // Reviews Slider
    initReviewsSlider();

    // Header Scroll Effect
    initHeaderScroll();

    // Animate on Scroll
    initScrollAnimations();
});

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        navMenu.classList.toggle('mobile-open');
        body.classList.toggle('menu-open');
    });

    // Close menu on link click
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navMenu.classList.remove('mobile-open');
            body.classList.remove('menu-open');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            navMenu.classList.remove('mobile-open');
            body.classList.remove('menu-open');
        }
    });
}

/**
 * Megamenu Enhancement
 */
function initMegamenu() {
    const megamenuItems = document.querySelectorAll('.nav-item.has-megamenu');

    megamenuItems.forEach(item => {
        const megamenu = item.querySelector('.megamenu');
        if (!megamenu) return;

        let timeout;

        // Desktop hover behavior
        item.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            // Close other megamenus
            megamenuItems.forEach(other => {
                if (other !== item) {
                    other.querySelector('.megamenu')?.classList.remove('active');
                }
            });
            megamenu.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                megamenu.classList.remove('active');
            }, 100);
        });

        megamenu.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
        });

        megamenu.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                megamenu.classList.remove('active');
            }, 100);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.megamenu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Reviews Slider
 */
function initReviewsSlider() {
    const slider = document.querySelector('.reviews-slider');
    const nextBtn = document.querySelector('.slider-arrow-next');

    if (!slider || !nextBtn) return;

    const cards = slider.querySelectorAll('.review-card');
    let currentIndex = 0;

    // Only initialize slider on mobile
    function updateSlider() {
        if (window.innerWidth > 768) {
            cards.forEach(card => {
                card.style.display = '';
                card.style.opacity = '';
            });
            return;
        }

        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');

    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show top bar on scroll
        if (topBar) {
            if (currentScroll > 100) {
                topBar.classList.add('hidden');
            } else {
                topBar.classList.remove('hidden');
            }
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.category-card, .about-feature, .review-card, .blog-card, .contact-card'
    );

    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

/**
 * Newsletter Form
 */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        const originalText = button.textContent;

        // Simple validation
        if (!email || !email.includes('@')) {
            alert('Prosím zadejte platnou e-mailovou adresu.');
            return;
        }

        // Simulate submission
        button.textContent = 'Odesílám...';
        button.disabled = true;

        // Here you would normally send to your API
        setTimeout(() => {
            button.textContent = 'Odesláno!';
            this.querySelector('input[type="email"]').value = '';

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1000);
    });
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading
initLazyLoading();
