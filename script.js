/**
 * MBN International - Core Interactive Functionality
 * Pure Vanilla JavaScript (No Node / React / External Build Tools)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Copyright Year
    const yearPlaceholder = document.getElementById('yearPlaceholder');
    if (yearPlaceholder) {
        yearPlaceholder.textContent = new Date().getFullYear();
    }

    // 2. Sticky Header Elevation on Scroll
    const mainHeader = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // 3. Mobile Hamburger Navigation Drawer
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navbar) {
        hamburgerBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            hamburgerBtn.classList.toggle('open');
        });

        // Close drawer on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                hamburgerBtn.classList.remove('open');
            });
        });
    }

    // 4. Scroll Spy (Active Navigation Highlight)
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // 5. Interactive RFQ Form Submission & WhatsApp Forwarding
    const inquiryForm = document.getElementById('inquiryForm');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form Fields Extraction
            const fullName = document.getElementById('fullName').value.trim();
            const companyName = document.getElementById('companyName').value.trim();
            const ksaCity = document.getElementById('ksaCity').value;
            const serviceType = document.getElementById('serviceType').value;
            const workforceCount = document.getElementById('workforceCount').value;
            const contactPhone = document.getElementById('contactPhone').value.trim();
            const projectMessage = document.getElementById('projectMessage').value.trim();

            // Basic Validation Check
            if (!fullName || !companyName || !ksaCity || !serviceType || !contactPhone) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Please fill in all mandatory fields marked with an asterisk (*).';
                return;
            }

            // Button Loading State
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing RFQ...';

            // Simulate server response and compose direct WhatsApp message
            setTimeout(() => {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = 'Thank you! Your RFQ has been logged. Redirecting you to WhatsApp operations desk...';

                // Construct formatted WhatsApp text
                const waText = encodeURIComponent(
                    `*New RFQ - MBN International*\n` +
                    `--------------------------------\n` +
                    `*Client Name:* ${fullName}\n` +
                    `*Company:* ${companyName}\n` +
                    `*Project City:* ${ksaCity}\n` +
                    `*Service:* ${serviceType}\n` +
                    `*Workforce Scale:* ${workforceCount}\n` +
                    `*Phone:* ${contactPhone}\n` +
                    `*Scope/Notes:* ${projectMessage || 'None provided'}\n` +
                    `--------------------------------\n` +
                    `_Sent via official web portal._`
                );

                const waUrl = `https://wa.me/966539602464?text=${waText}`;

                // Redirect after brief visual confirmation
                setTimeout(() => {
                    window.open(waUrl, '_blank');
                    inquiryForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }, 1200);

            }, 1000);
        });
    }

    // 6. Bilingual Interface Switcher (Mock / Ready for Arabic Expansion)
    const langToggle = document.getElementById('langToggle');
    let isArabic = false;

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            isArabic = !isArabic;
            if (isArabic) {
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.setAttribute('lang', 'ar');
                langToggle.querySelector('span').textContent = 'English';
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.setAttribute('lang', 'en');
                langToggle.querySelector('span').textContent = 'عربي';
            }
        });
    }
});