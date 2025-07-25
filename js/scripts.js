// Modern CV JS by AI

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for nav links
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                // Set active class
                document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Section reveal on scroll
    const revealSections = document.querySelectorAll('.card');
    const revealOnScroll = () => {
        const trigger = window.innerHeight * 0.92;
        revealSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < trigger) {
                section.style.opacity = 1;
                section.style.transform = 'none';
            } else {
                section.style.opacity = 0;
                section.style.transform = 'translateY(40px)';
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
