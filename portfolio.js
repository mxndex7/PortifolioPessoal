
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-quad',
            once: true,
            offset: 100
        });
    }
});


const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

function onScroll() {
    const scrollY = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 50);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', scrollY > 500);

    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });

    const heroGrid = document.querySelector('.hero-background-grid');
    if (heroGrid) heroGrid.style.transform = `translateY(${scrollY * 0.5}px)`;

    revealOnScroll();
}

window.addEventListener('scroll', onScroll);

const typingText = document.querySelector('.typing-text');
const phrases = ['Desenvolvedor Full Stack', 'UX/UI Designer', 'Técnico de Suporte'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;
    
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}


function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        if (typeof gsap !== 'undefined') {
            gsap.to(counter, {
                textContent: target,
                duration: 2.5,
                snap: { textContent: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    counter.textContent = Math.ceil(this.targets()[0].textContent) + (this.progress() === 1 ? '+' : '');
                }
            });
        }
    });
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.experience-card, .project-card, .about-stats, .edu-card, .cert-list li').forEach(el => observer.observe(el));


const carousel = {
    currentSlide: 0,
    slides: document.querySelectorAll('.carousel-slide'),
    indicators: document.querySelector('.carousel-indicators'),
    interval: null,
    autoPlayDelay: 15000,

    init() {
        if (!this.slides.length) return;

        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(dot);
        });

        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        this.startAutoPlay();

        const carouselElement = document.querySelector('.main-carousel');
        if (carouselElement) {
            carouselElement.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carouselElement.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    },

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators.children[this.currentSlide]) {
            this.indicators.children[this.currentSlide].classList.remove('active');
        }
        
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators.children[this.currentSlide]) {
            this.indicators.children[this.currentSlide].classList.add('active');
        }
        
        this.resetAutoPlay();
    },

    next() {
        this.goToSlide(this.currentSlide + 1);
    },

    prev() {
        this.goToSlide(this.currentSlide - 1);
    },

    startAutoPlay() {
        this.interval = setInterval(() => this.next(), this.autoPlayDelay);
    },

    pauseAutoPlay() {
        clearInterval(this.interval);
    },

    resetAutoPlay() {
        clearInterval(this.interval);
        this.startAutoPlay();
    }
};

scrollTopBtn.addEventListener('click', () => {
    if (typeof gsap !== 'undefined') {
        gsap.to(window, {
            scrollTo: 0,
            duration: 1,
            ease: 'power2.inOut'
        });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});


function revealOnScroll() {
    const reveals = document.querySelectorAll('.hero-banner, .experience-card, .project-card, .edu-card, .skill-tag');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}


document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'back.out'
            });
        }
    });

    btn.addEventListener('mouseleave', function() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'back.out'
            });
        }
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this, {
                y: -20,
                duration: 0.4,
                ease: 'power2.out',
                boxShadow: '0 20px 50px rgba(255, 255, 255, 0.1)'
            });
        }
    });

    card.addEventListener('mouseleave', function() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this, {
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                boxShadow: '0 0px 0px rgba(0,0,0,0)'
            });
        }
    });
});


function animateHeroTitle() {
    const title = document.querySelector('.hero-title');
    if (title && typeof gsap !== 'undefined') {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.from(title.querySelectorAll('.highlight'), {
            delay: 0.3,
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
}


window.addEventListener('load', () => {
    type();
    carousel.init();
    animateHeroTitle();
    revealOnScroll();
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.setAttribute('data-aos', 'zoom-in');
        card.setAttribute('data-aos-delay', index * 150);
    });

    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.setAttribute('data-aos', 'fade-up');
        tag.setAttribute('data-aos-delay', (index % 3) * 100);
    });


    if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 100);
    }
});
