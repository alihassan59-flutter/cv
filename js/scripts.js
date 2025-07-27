document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar-v2');
    const sections = document.querySelectorAll('.section-block');

    // Function to update active navigation link and sticky navbar state
    const updateNavAndSticky = () => {
        let currentSectionId = '';
        const navbarHeight = navbar.offsetHeight;

        // Determine current section for active nav link
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Adjust offset to be slightly above the section for better UX
            const offset = navbarHeight + 20; // 20px buffer

            if (rect.top <= offset && rect.bottom >= offset) {
                currentSectionId = '#' + section.id;
            }
        });

        document.querySelectorAll('.navbar-v2 a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });

        // Toggle sticky class on navbar
        if (window.pageYOffset > navbar.offsetTop) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar-v2 a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight; // Get current navbar height (could be sticky)
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // Intersection Observer for "reveal" animation on sections
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% of the section must be visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial check on load and attach scroll listener
    updateNavAndSticky();
    window.addEventListener('scroll', updateNavAndSticky);
});