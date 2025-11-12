// Main JavaScript functionality for Elizabeth Efeelobari Portfolio

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initTypewriter();
    initSkillsChart();
    initPortfolioFilter();
    initContactForm();
    initParticleBackground();
    initNavigation();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
}

// Typewriter effect for hero section
function initTypewriter() {
    if (typeof Typed !== 'undefined' && document.getElementById('hero-typewriter')) {
        new Typed('#hero-typewriter', {
            strings: [
                'Versatile Content Creator',
                'Investigative Journalist',
                'SEO Strategy Expert',
                'Storyteller & Writer'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Skills radar chart for about page
function initSkillsChart() {
    if (typeof echarts !== 'undefined' && document.getElementById('skills-chart')) {
        const chartDom = document.getElementById('skills-chart');
        const myChart = echarts.init(chartDom);
        
        const option = {
            title: {
                text: 'Writing Expertise',
                left: 'center',
                textStyle: {
                    color: '#1a1a1a',
                    fontSize: 24,
                    fontWeight: 'bold'
                }
            },
            radar: {
                indicator: [
                    { name: 'SEO Writing', max: 100 },
                    { name: 'Investigative Reporting', max: 100 },
                    { name: 'Content Strategy', max: 100 },
                    { name: 'Social Media', max: 100 },
                    { name: 'Ghostwriting', max: 100 },
                    { name: 'Feature Writing', max: 100 }
                ],
                shape: 'polygon',
                splitNumber: 4,
                axisName: {
                    color: '#8b9a8b',
                    fontSize: 12
                },
                splitLine: {
                    lineStyle: {
                        color: '#d4a574',
                        opacity: 0.3
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(212, 165, 116, 0.1)', 'rgba(139, 154, 139, 0.1)']
                    }
                }
            },
            series: [{
                name: 'Skills',
                type: 'radar',
                data: [{
                    value: [95, 88, 92, 85, 90, 94],
                    name: 'Elizabeth Efeelobari',
                    areaStyle: {
                        color: 'rgba(212, 165, 116, 0.3)'
                    },
                    lineStyle: {
                        color: '#d4a574',
                        width: 3
                    },
                    itemStyle: {
                        color: '#d4a574'
                    }
                }],
                animationDuration: 2000,
                animationEasing: 'cubicOut'
            }]
        };
        
        myChart.setOption(option);
        
        // Responsive chart
        window.addEventListener('resize', () => {
            myChart.resize();
        });
    }
}

// Portfolio filtering functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const searchInput = document.getElementById('portfolio-search');
    
    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    anime({
                        targets: item,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 600,
                        easing: 'easeOutCubic'
                    });
                } else {
                    anime({
                        targets: item,
                        opacity: 0,
                        scale: 0.8,
                        duration: 300,
                        easing: 'easeInCubic',
                        complete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            portfolioItems.forEach(item => {
                const title = item.querySelector('.item-title').textContent.toLowerCase();
                const excerpt = item.querySelector('.item-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    let currentStep = 0;
    
    // Multi-step form navigation
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                steps[currentStep].classList.remove('active');
                currentStep++;
                steps[currentStep].classList.add('active');
                updateProgressBar();
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            steps[currentStep].classList.remove('active');
            currentStep--;
            steps[currentStep].classList.add('active');
            updateProgressBar();
        });
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            anime({
                targets: '.form-container',
                scale: [1, 0.95, 1],
                duration: 600,
                easing: 'easeInOutQuad',
                complete: () => {
                    showSuccessMessage();
                }
            });
        });
    }
    
    function validateStep(step) {
        const currentStepElement = steps[step];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    function updateProgressBar() {
        const progress = ((currentStep + 1) / steps.length) * 100;
        anime({
            targets: '.progress-bar',
            width: progress + '%',
            duration: 400,
            easing: 'easeOutCubic'
        });
    }
    
    function showSuccessMessage() {
        const successHTML = `
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h3>Thank you for your message!</h3>
                <p>I'll get back to you within 24 hours.</p>
            </div>
        `;
        
        document.querySelector('.form-container').innerHTML = successHTML;
        
        anime({
            targets: '.success-message',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });
    }
}

// Particle background effect
function initParticleBackground() {
    if (typeof p5 !== 'undefined' && document.getElementById('particle-canvas')) {
        new p5((sketch) => {
            let particles = [];
            
            sketch.setup = () => {
                const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                canvas.parent('particle-canvas');
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: sketch.random(sketch.width),
                        y: sketch.random(sketch.height),
                        vx: sketch.random(-0.5, 0.5),
                        vy: sketch.random(-0.5, 0.5),
                        size: sketch.random(2, 6),
                        opacity: sketch.random(0.1, 0.3)
                    });
                }
            };
            
            sketch.draw = () => {
                sketch.clear();
                
                particles.forEach(particle => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = sketch.width;
                    if (particle.x > sketch.width) particle.x = 0;
                    if (particle.y < 0) particle.y = sketch.height;
                    if (particle.y > sketch.height) particle.y = 0;
                    
                    // Draw particle
                    sketch.fill(212, 165, 116, particle.opacity * 255);
                    sketch.noStroke();
                    sketch.ellipse(particle.x, particle.y, particle.size);
                });
            };
            
            sketch.windowResized = () => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            };
        });
    }
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation item
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
function animateCounter(element, target, duration = 2000) {
    anime({
        targets: { count: 0 },
        count: target,
        duration: duration,
        easing: 'easeOutCubic',
        update: function(anim) {
            element.textContent = Math.floor(anim.animatables[0].target.count);
        }
    });
}

// Reading time calculator
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            anime({
                targets: 'body',
                opacity: 0,
                duration: 300,
                easing: 'easeInCubic',
                complete: () => {
                    window.location.href = href;
                }
            });
        });
    });
}