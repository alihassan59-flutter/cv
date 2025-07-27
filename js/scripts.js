document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar-v2');
    const sections = document.querySelectorAll('.section-block');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list-v2');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        navList.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scroll
    };

    // Function to update active navigation link and sticky navbar state
    const updateNavAndSticky = () => {
        let currentSectionId = '';
        // Use a fixed small height for sticky navbar to avoid layout shifts on mobile
        // On mobile, the actual navbar element becomes the wrapper for the hamburger.
        // We want to detect sections based on scrolling past the *visual* top of the viewport,
        // so a fixed small offset for sticky and section detection is better.
        const effectiveNavbarHeight = navbar.offsetHeight; // This will be small on mobile due to CSS
        const offsetForSectionDetection = effectiveNavbarHeight + 20; // 20px buffer below fixed nav

        // Determine current section for active nav link
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= offsetForSectionDetection && rect.bottom >= offsetForSectionDetection) {
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
    document.querySelectorAll('.nav-list-v2 a').forEach(anchor => { // Target links inside nav-list-v2
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                closeMobileMenu();
            }

            // Calculate scroll position, accounting for sticky navbar
            const navbarHeight = navbar.offsetHeight; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        // Prevent body scrolling when menu is open
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside (on overlay)
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

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