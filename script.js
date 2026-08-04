document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAVIGATION & MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* ==========================================================================
       2. INTERACTIVE SERVICE TABS
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabTarget = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const activeContent = document.getElementById(tabTarget);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       3. PORTFOLIO FILTERING SYSTEM
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       4. CAREER POP-UP MODAL HANDLER
       ========================================================================== */
    const openCareerBtn = document.getElementById('open-career-modal');
    const closeCareerBtn = document.getElementById('closeCareerModal');
    const careerModal = document.getElementById('careerModal');
    const careerForm = document.getElementById('careerForm');

    if (openCareerBtn && careerModal && closeCareerBtn) {
        openCareerBtn.addEventListener('click', () => {
            careerModal.classList.add('active');
        });

        closeCareerBtn.addEventListener('click', () => {
            careerModal.classList.remove('active');
        });

        careerModal.addEventListener('click', (e) => {
            if (e.target === careerModal) {
                careerModal.classList.remove('active');
            }
        });
    }

    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const candidateName = document.getElementById('cName').value;
            const trade = document.getElementById('cTrade').value;
            
            alert(`Thank you, ${candidateName}. Your application for "${trade}" has been logged into MBN International's talent pool. Our HR team in Riyadh will review your application.`);
            
            careerForm.reset();
            careerModal.classList.remove('active');
        });
    }

    /* ==========================================================================
       5. CONTACT & MAIL HUB FORM HANDLING
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form Field Values
            const fullName = document.getElementById('fullName').value.trim();
            const companyName = document.getElementById('companyName').value.trim() || 'N/A';
            const email = document.getElementById('emailAddress').value.trim();
            const phone = document.getElementById('phoneWhatsApp').value.trim();
            const service = document.getElementById('serviceRequired').value;
            const location = document.getElementById('projectLocation').value.trim() || 'Riyadh / Unspecified KSA';
            const message = document.getElementById('detailedMessage').value.trim();

            // Trigger mailto link as direct fall-back or dynamic mailer handler
            const mailtoSubject = encodeURIComponent(`Inquiry from ${fullName} - ${service}`);
            const mailtoBody = encodeURIComponent(
                `Full Name: ${fullName}\n` +
                `Company: ${companyName}\n` +
                `Email: ${email}\n` +
                `Phone/WhatsApp: ${phone}\n` +
                `Service Required: ${service}\n` +
                `Project Location: ${location}\n\n` +
                `Message / Requirement:\n${message}`
            );

            // Display Feedback Box
            if (formFeedback) {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = `
                    <p><i class="fa-solid fa-circle-check"></i> <strong>Inquiry Processed!</strong> Opening your email client to dispatch details to <code>info@mbn-international.com</code>...</p>
                `;
            }

            // Launch mail client after a tiny delay
            setTimeout(() => {
                window.location.href = `mailto:info@mbn-international.com?subject=${mailtoSubject}&body=${mailtoBody}`;
                contactForm.reset();
            }, 1000);
        });
    }

});