/* ===================================
   CLAUDE ESIMERKKI - KAMPAAMO
   main.js - Interaktiivisuus
   =================================== */

(function () {
    'use strict';

    // ================================
    // Navigation toggle (mobile)
    // ================================
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');

    function openNav() {
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (navToggle) navToggle.addEventListener('click', openNav);
    if (navClose) navClose.addEventListener('click', closeNav);

    // Close nav when a link is clicked
    if (navMenu) {
        navMenu.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });
    }

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu && navMenu.classList.contains('open')) {
            if (!navMenu.contains(e.target) && e.target !== navToggle) {
                closeNav();
            }
        }
    });

    // ================================
    // Sticky header shadow on scroll
    // ================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (!header) return;
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ================================
    // Active nav link on scroll
    // ================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    function updateActiveLink() {
        var scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ================================
    // Contact form – success message
    // ================================
    var contactForm = document.getElementById('contact-form');
    var formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            var name = contactForm.querySelector('#name');
            var email = contactForm.querySelector('#email');
            var message = contactForm.querySelector('#message');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                return;
            }

            // Show success state
            if (formSuccess) {
                contactForm.hidden = true;
                formSuccess.hidden = false;
            }
        });
    }

    // ================================
    // Smooth scroll for anchor links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ================================
    // Init
    // ================================
    handleScroll();
    updateActiveLink();
})();
