document.addEventListener('DOMContentLoaded', function() {
    // Configuração do Swiper Slider
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        touchRatio: 1,
        observer: true,
        observeParents: true
    });
    
    document.addEventListener('touchstart', function() {
        swiper.autoplay.start();
    }, {passive: true});

    // Detecta se é um dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Configuração das Partículas
    particlesJS('particles-js', {
        particles: {
            number: {
                value: isMobile ? 15 : 30,
                density: {
                    enable: true,
                    value_area: isMobile ? 800 : 1000
                }
            },
            color: {
                value: '#0056b3'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.4,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: isMobile ? 2 : 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 30,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: isMobile ? 120 : 150,
                color: '#0056b3',
                opacity: 0.3,
                width: isMobile ? 0.8 : 1
            },
            move: {
                enable: true,
                speed: isMobile ? 0.8 : 1.5,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: isMobile ? 'window' : 'canvas',
            events: {
                onhover: {
                    enable: !isMobile,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: isMobile ? 1 : 2
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: false
    });
    
    // Recarrega as partículas quando muda a orientação em dispositivos móveis
    if (isMobile) {
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                    window.pJSDom = [];
                    particlesJS('particles-js', window.particlesJSConfig);
                }
            }, 500);
        });
    }

    // Menu de navegação móvel
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Header com efeito de scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Botão voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animação dos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Efeito hover nos cards
    const handleCardHover = debounce(function(event) {
        if (event.type === 'mouseenter') {
            this.style.zIndex = '5';
            document.querySelectorAll('.service-card:not(:hover)').forEach(card => {
                card.style.opacity = '0.8';
            });
        } else {
            this.style.zIndex = '1';
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.opacity = '1';
            });
        }
    }, 50);
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardHover);
    });

    // Animação com Intersection Observer para elementos que aparecem ao rolar a página
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .about-text, .about-image, .contact-card, .social-icon, .hero-content');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Efeito nos botões
    const actionBtns = document.querySelectorAll('.request-btn, .cta-button');
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
        });
        btn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Efeito de paralax no scroll
    let scrollThrottle = false;
    
    window.addEventListener('scroll', function() {
        if (scrollThrottle) return;
        scrollThrottle = true;
        
        setTimeout(function() {
            const scrollPosition = window.scrollY;
            
            // Parallax no fundo de partículas
            const particles = document.getElementById('particles-js');
            if (particles) {
                particles.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            }
            
            // Parallax nos títulos das seções
            const titles = document.querySelectorAll('.section-title');
            titles.forEach(title => {
                const titlePosition = title.getBoundingClientRect().top + window.scrollY;
                const offset = (scrollPosition - titlePosition) * 0.03;
                if (Math.abs(offset) < 15) {
                    title.style.transform = `translateY(${offset}px)`;
                }
            });
            
            scrollThrottle = false;
        }, 100);
    });

    // Adiciona efeito de brilho nos botões
    const addButtonGlow = () => {
        const buttons = document.querySelectorAll('.request-btn, .cta-button');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', debounce(function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--secondary-color), var(--primary-color))`;
            }, 30));
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'var(--gradient-primary)';
            });
        });
    };
    
    addButtonGlow();

    // Navegação ativa conforme rolagem
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
});

// CSS dinâmico
document.head.insertAdjacentHTML('beforeend', `
<style>
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .header.scrolled {
        background-color: rgba(22, 27, 34, 0.98);
        height: 65px;
        box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .header.scrolled {
            height: 60px;
        }
    }
</style>
`);