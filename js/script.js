document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }
            
            // Show success message (in real implementation, send to server)
            alert('Vielen Dank für Ihre Anfrage! Wir melden uns binnen 24 Stunden bei Ihnen.');
            this.reset();
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all service cards and other elements
    document.querySelectorAll('.service-card, .pricing-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    }

    // Animate counters when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-item h3');
                
                // Counter 1: 100 Fahrzeuge
                if (counters[0]) animateCounter(counters[0], 100);
                
                // Counter 2: 200 Displays
                if (counters[1]) animateCounter(counters[1], 200);
                
                // Counter 3: 100k Kontakte
                if (counters[2]) animateCounter(counters[2], 100, 'k');
                
                // Counter 4: 24/7 (no animation needed, just set text)
                if (counters[3]) counters[3].textContent = '24/7';
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);


    // verhindert die buchstabeneingabe live im tefelonfeld
    document.getElementById("phone").addEventListener("input", function (e) {
        this.value = this.value.replace(/[^0-9+ ]/g, "");
    });

    // verhindert die zahleneingabe live im Namensfeld
    document.getElementById('name').addEventListener('input', function (e) {
        this.value = this.value.replace(/[^A-Za-zÄÖÜäöüß\s]/g, '');
    });

    // stop formSubmit Brand to appear

    document.on

    // chatgpt - kontaktformular direkt an die mailadresse
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        fetch("send-mail.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                showPopup();
                form.reset();
            } else {
                alert("Fehler beim Versenden der Nachricht. Bitte versuchen Sie es erneut.");
            }
        })
        .catch(error => {
            alert("Serverfehler. Bitte versuchen Sie es später erneut.");
        });
    });

        function showPopup() {
            document.getElementById("popup").style.display = "flex";
        }

        function closePopup() {
            document.getElementById("popup").style.display = "none";
        }
});

// Logo-Slideshow Script
(function() {
    const slides = document.querySelectorAll('.slide-logo');
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    let current = 0;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }
    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }
    // Initial anzeigen
    showSlide(current);
    // Automatischer Wechsel
    setInterval(nextSlide, 2500);
    // Dots anklickbar machen
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            current = idx;
            showSlide(current);
        });
    });
})();
