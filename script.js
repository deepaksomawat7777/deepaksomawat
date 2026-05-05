/*
* Portfolio Logic
* Handles: Preloader, Navigation, Project Filtering, Modals, Animations
*/

document.addEventListener('DOMContentLoaded', () => {


    // --- Advanced Preloader (Text Decoding) ---
    const preloader = document.getElementById('preloader');
    const loaderText = document.querySelector('.loader-text');
    const originalText = loaderText ? loaderText.innerText : 'LOADING';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

    if (preloader && loaderText) {
        let iterations = 0;
        const interval = setInterval(() => {
            loaderText.innerText = originalText.split('')
                .map((letter, index) => {
                    if (index < iterations) return originalText[index];
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);

                // Cyber Split Shutter Reveal
                setTimeout(() => {
                    document.body.classList.add('loaded');

                    setTimeout(() => {
                        preloader.style.display = 'none';
                        // Start Typing Effect after animation
                        initTypingEffect();
                    }, 1000);
                }, 1000);
            }
            iterations += 1 / 3;
        }, 30);
    }

    // --- Typing Effect ---
    function initTypingEffect() {
        const titleElement = document.querySelector('.hero-subtitle');
        if (!titleElement) return;

        const roles = ["Full Stack Developer", "Web Developer", "Frontend Expert", "Backend Developer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        titleElement.classList.add('typing-text');

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                titleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                titleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }







    // --- Canvas Background (Constellation) ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Resize Canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            // Higher density: 9000 -> 6000
            let numberOfParticles = (canvas.height * canvas.width) / 6000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = 'rgba(0, 242, 255, 0.3)';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }



        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
        });
    }

    // --- AOS Initialization ---
    // Note: AOS library script must be loaded in HTML
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // --- Navbar Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Scroll Spy & Active Link ---
    const sections = document.querySelectorAll('section');
    // navLinks is already defined above

    const observerOptions = {
        root: null,
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: "-20% 0px -20% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active to current
                const id = entry.target.getAttribute('id');
                const link = document.querySelector(`.nav-link[href="#${id}"]`);
                if (link) link.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Staggered Animation for Initial Load
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- Project Data Source ---
    const projectsData = {
        'estatefind': {
            title: 'EstateFind',
            category: 'Full Stack Web',
            date: 'Academic Project | 2024',
            desc: 'A full-stack real estate platform built with Angular and Node.js. Features include property listings with advanced search & filter, user authentication, property detail pages, admin dashboard for managing listings, and a contact/inquiry system.',
            tech: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MySQL'],
            github: 'https://github.com/gajendra99',
            live: '#'
        },
        'hanginghours': {
            title: 'HangingHours',
            category: 'Full Stack Web',
            date: 'Professional Project | 2024',
            desc: 'A complete restaurant management solution. Features include a dynamic menu, online food ordering system, order tracking for customers, and a powerful admin dashboard for menu management and order processing.',
            tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
            github: 'https://github.com/gajendra99',
            live: '#'
        },
        'eventease': {
            title: 'Event Ease',
            category: 'Full Stack Web | Wedding Planner',
            date: 'Personal Project | 2025',
            desc: 'A specialized wedding planning application designed to simplify the coordination of a dream wedding. Features include guest list management, digital RSVP tracking, vendor directory, budget calculation, and interactive wedding timelines.',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
            github: 'https://github.com/gajendra99',
            live: '#'
        }
    };

    // --- Card Slideshows (auto-cycle) ---
    function initSlideshows() {
        document.querySelectorAll('.card-slideshow').forEach(slideshow => {
            const slides = slideshow.querySelectorAll('.slide');
            const dots = slideshow.querySelectorAll('.dot');
            if (slides.length < 2) return;

            let current = 0;

            function goTo(n) {
                slides[current].classList.remove('active');
                dots[current] && dots[current].classList.remove('active');
                current = (n + slides.length) % slides.length;
                slides[current].classList.add('active');
                dots[current] && dots[current].classList.add('active');
            }

            setInterval(() => goTo(current + 1), 2500);
        });
    }
    initSlideshows();

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalBody = modal ? modal.querySelector('.modal-body') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;

    function openModal(projectKey) {
        const data = projectsData[projectKey];
        if (!data || !modal || !modalBody) return;

        const techHTML = data.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('');

        modalBody.innerHTML = `
            <div class="modal-header">
                <span class="modal-category">${data.category}</span>
                <span class="modal-date"><i class="fas fa-calendar-alt"></i> ${data.date}</span>
            </div>
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-desc">${data.desc}</p>
            <div class="modal-section">
                <h4><i class="fas fa-code"></i> Tech Stack</h4>
                <div class="modal-tech-list">${techHTML}</div>
            </div>
            <div class="modal-actions">
                <a href="${data.github}" target="_blank" class="btn btn-outline modal-action-btn">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
                <a href="${data.live}" target="_blank" class="btn btn-primary modal-action-btn">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open modal on "View Details" click
    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            if (card) openModal(card.getAttribute('data-project'));
        });
    });

    // Close on X button
    if (modalClose) modalClose.addEventListener('click', closeModal);

    // Close on backdrop click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

});


