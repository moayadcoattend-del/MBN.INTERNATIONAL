/**
 * MBN International - Main Script
 * Standard Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // Active Link Scroll Highlight
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });
});

/**
 * Handle Quote Request Form Submission
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value;
    const company = document.getElementById('companyName').value;
    const city = document.getElementById('ksaCity').value;
    const count = document.getElementById('laborCount').value;
    const message = document.getElementById('message').value;

    const feedbackDiv = document.getElementById('formFeedback');

    // Simulate instant form submission & feedback
    feedbackDiv.className = 'form-feedback success';
    feedbackDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your inquiry for <strong>${count} workers</strong> in <strong>${city}</strong> has been sent to MBN Operations. We will contact you shortly with an official quotation in SAR.`;

    // Reset Form
    document.getElementById('quoteForm').reset();

    // Auto-clear notification after 8 seconds
    setTimeout(() => {
        feedbackDiv.className = 'form-feedback hidden';
    }, 8000);
}