// Portfolio website interactions
// Handles mobile navigation, active links, project filters, FAQ toggles, and basic contact-form feedback.

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Set active nav link robustly on GitHub Pages and local files
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const hrefPage = link.getAttribute('href')?.split('/').pop();
        link.classList.toggle('active', hrefPage === currentPage);
    });

    // Project filtering on projects.html
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.detailed-project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || category === filterValue;

                card.style.display = shouldShow ? 'block' : 'none';
                card.style.opacity = shouldShow ? '1' : '0';
            });
        });
    });

    // FAQ accordion on contact.html
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Basic contact form validation and mailto fallback
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm?.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const privacy = document.getElementById('privacy')?.checked;

        clearErrors();

        let valid = true;
        if (!name) valid = showError('nameError', 'Please enter your name.');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) valid = showError('emailError', 'Please enter a valid email address.');
        if (!subject) valid = showError('subjectError', 'Please select a subject.');
        if (!message) valid = showError('messageError', 'Please enter your message.');
        if (!privacy) valid = showError('privacyError', 'Please accept the privacy policy.');

        if (!valid) {
            setFormMessage('Please fix the highlighted fields.', 'error');
            return;
        }

        const mailSubject = encodeURIComponent(`Portfolio message: ${subject}`);
        const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:georgedavid.uk1@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        setFormMessage('Opening your email app so you can send the message.', 'success');
    });

    function showError(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
        return false;
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        setFormMessage('', '');
    }

    function setFormMessage(text, type) {
        if (!formMessage) return;
        formMessage.textContent = text;
        formMessage.className = type ? `form-message ${type}` : 'form-message';
    }
});
