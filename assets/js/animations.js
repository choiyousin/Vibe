// ===== ADVANCED ANIMATIONS =====

// Animation Engine
class AnimationEngine {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadAnimations();
        this.setupParallaxEffects();
        this.setupMorphingShapes();
        this.setupTextAnimations();
    }
    
    // Scroll-triggered animations
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll]');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute('data-scroll');
                    this.triggerScrollAnimation(element, animation);
                    scrollObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        scrollElements.forEach(el => scrollObserver.observe(el));
    }
    
    triggerScrollAnimation(element, animationType) {
        switch (animationType) {
            case 'fadeIn':
                this.fadeIn(element);
                break;
            case 'slideUp':
                this.slideUp(element);
                break;
            case 'slideLeft':
                this.slideLeft(element);
                break;
            case 'slideRight':
                this.slideRight(element);
                break;
            case 'zoomIn':
                this.zoomIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
            case 'stagger':
                this.staggerAnimation(element);
                break;
            default:
                this.fadeIn(element);
        }
    }
    
    // Animation methods
    fadeIn(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }
    
    slideUp(element, duration = 800) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }
    
    slideLeft(element, duration = 800) {
        element.style.transform = 'translateX(50px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }
    
    slideRight(element, duration = 800) {
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }
    
    zoomIn(element, duration = 800) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }
    
    rotateIn(element, duration = 800) {
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'rotate(0deg) scale(1)';
            element.style.opacity = '1';
        });
    }
    
    staggerAnimation(container, delay = 100) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'opacity 600ms ease, transform 600ms ease';
            
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }
    
    // Hover animations
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover]');
        
        hoverElements.forEach(element => {
            const hoverType = element.getAttribute('data-hover');
            
            element.addEventListener('mouseenter', () => {
                this.triggerHoverAnimation(element, hoverType, true);
            });
            
            element.addEventListener('mouseleave', () => {
                this.triggerHoverAnimation(element, hoverType, false);
            });
        });
    }
    
    triggerHoverAnimation(element, animationType, isEnter) {
        switch (animationType) {
            case 'lift':
                this.hoverLift(element, isEnter);
                break;
            case 'glow':
                this.hoverGlow(element, isEnter);
                break;
            case 'rotate':
                this.hoverRotate(element, isEnter);
                break;
            case 'scale':
                this.hoverScale(element, isEnter);
                break;
            case 'tilt':
                this.hoverTilt(element, isEnter);
                break;
        }
    }
    
    hoverLift(element, isEnter) {
        element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        if (isEnter) {
            element.style.transform = 'translateY(-5px)';
            element.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        } else {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '';
        }
    }
    
    hoverGlow(element, isEnter) {
        element.style.transition = 'box-shadow 0.3s ease';
        if (isEnter) {
            element.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
        } else {
            element.style.boxShadow = '';
        }
    }
    
    hoverRotate(element, isEnter) {
        element.style.transition = 'transform 0.3s ease';
        if (isEnter) {
            element.style.transform = 'rotate(5deg)';
        } else {
            element.style.transform = 'rotate(0deg)';
        }
    }
    
    hoverScale(element, isEnter) {
        element.style.transition = 'transform 0.3s ease';
        if (isEnter) {
            element.style.transform = 'scale(1.05)';
        } else {
            element.style.transform = 'scale(1)';
        }
    }
    
    hoverTilt(element, isEnter) {
        if (!isEnter) {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            return;
        }
        
        element.addEventListener('mousemove', this.handleTiltMove.bind(this));
        element.addEventListener('mouseleave', this.handleTiltLeave.bind(this));
    }
    
    handleTiltMove(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    handleTiltLeave(e) {
        const element = e.currentTarget;
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    
    // Load animations
    setupLoadAnimations() {
        const loadElements = document.querySelectorAll('[data-load]');
        
        loadElements.forEach((element, index) => {
            const animationType = element.getAttribute('data-load');
            const delay = index * 100;
            
            setTimeout(() => {
                this.triggerScrollAnimation(element, animationType);
            }, delay);
        });
    }
    
    // Parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        window.addEventListener('scroll', this.throttle(handleScroll, 16));
    }
    
    // Morphing shapes
    setupMorphingShapes() {
        const morphingShapes = document.querySelectorAll('.morphing-shape');
        
        morphingShapes.forEach((shape, index) => {
            this.animateMorphingShape(shape, index);
        });
    }
    
    animateMorphingShape(shape, index) {
        const morphStates = [
            '30% 70% 70% 30% / 30% 30% 70% 70%',
            '58% 42% 75% 25% / 76% 46% 54% 24%',
            '50% 50% 33% 67% / 55% 27% 73% 45%',
            '33% 67% 58% 42% / 63% 68% 32% 37%'
        ];
        
        let currentState = 0;
        const duration = 3000 + (index * 500);
        
        setInterval(() => {
            currentState = (currentState + 1) % morphStates.length;
            shape.style.borderRadius = morphStates[currentState];
        }, duration);
    }
    
    // Text animations
    setupTextAnimations() {
        this.setupTypewriterEffect();
        this.setupTextReveal();
        this.setupCounterAnimation();
    }
    
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-typewriter');
            const speed = parseInt(element.getAttribute('data-speed')) || 100;
            this.typewriterEffect(element, text, speed);
        });
    }
    
    typewriterEffect(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    setupTextReveal() {
        const textRevealElements = document.querySelectorAll('[data-text-reveal]');
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTextReveal(entry.target);
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        textRevealElements.forEach(el => {
            this.prepareTextReveal(el);
            textObserver.observe(el);
        });
    }
    
    prepareTextReveal(element) {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word"><span class="word-inner">${word}</span></span>`
        ).join(' ');
        
        const wordInners = element.querySelectorAll('.word-inner');
        wordInners.forEach(word => {
            word.style.transform = 'translateY(100%)';
            word.style.transition = 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
        });
    }
    
    animateTextReveal(element) {
        const wordInners = element.querySelectorAll('.word-inner');
        
        wordInners.forEach((word, index) => {
            setTimeout(() => {
                word.style.transform = 'translateY(0%)';
            }, index * 100);
        });
    }
    
    setupCounterAnimation() {
        const counterElements = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(el => counterObserver.observe(el));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Public methods for manual animation triggering
    animate(element, animationType, options = {}) {
        const duration = options.duration || 800;
        const delay = options.delay || 0;
        
        setTimeout(() => {
            this.triggerScrollAnimation(element, animationType);
        }, delay);
    }
    
    animateSequence(elements, animationType, staggerDelay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.triggerScrollAnimation(element, animationType);
            }, index * staggerDelay);
        });
    }
}

// Particle System
class ParticleSystem {
    constructor(container) {
        this.container = container || document.body;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }
    
    init() {
        this.createContainer();
        this.startAnimation();
    }
    
    createContainer() {
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particles-container';
        this.particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        this.container.appendChild(this.particleContainer);
    }
    
    createParticle() {
        if (this.particles.length >= this.maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        const speed = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.3;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${opacity});
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.particleContainer.appendChild(particle);
        
        const particleData = {
            element: particle,
            x: x,
            y: y,
            speed: speed,
            opacity: opacity
        };
        
        this.particles.push(particleData);
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            particle.y -= particle.speed;
            particle.element.style.top = particle.y + 'px';
            
            if (particle.y < -10) {
                particle.element.remove();
                this.particles.splice(index, 1);
            }
        });
    }
    
    startAnimation() {
        const animate = () => {
            if (Math.random() < 0.1) {
                this.createParticle();
            }
            
            this.updateParticles();
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.createLoadingOverlay();
    }
    
    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">바이브 코딩 로딩 중...</div>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06b6d4 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Remove loading overlay after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Magnetic Cursor Effect
class MagneticCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }
    
    init() {
        this.createCursor();
        this.bindEvents();
    }
    
    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'magnetic-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        
        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        this.cursorFollower.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.2s ease;
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 5 + 'px';
            this.cursor.style.top = e.clientY - 5 + 'px';
            
            this.cursorFollower.style.left = e.clientX - 15 + 'px';
            this.cursorFollower.style.top = e.clientY - 15 + 'px';
        });
        
        // Magnetic effect on interactive elements
        const magneticElements = document.querySelectorAll('a, button, .magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation engine
    const animationEngine = new AnimationEngine();
    
    // Initialize particle system
    const particleSystem = new ParticleSystem();
    
    // Initialize loading animation
    const loadingAnimation = new LoadingAnimation();
    
    // Initialize magnetic cursor (optional, can be disabled for mobile)
    if (window.innerWidth > 768) {
        const magneticCursor = new MagneticCursor();
    }
    
    // Expose animation engine globally
    window.animationEngine = animationEngine;
});

// CSS for animations
const animationCSS = `
    .word {
        display: inline-block;
        overflow: hidden;
        vertical-align: top;
    }
    
    .word-inner {
        display: inline-block;
    }
    
    .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-spinner {
        width: 60px;
        height: 60px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid #ffffff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    .loading-text {
        font-size: 1.2rem;
        font-weight: 500;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Hide cursor on touch devices */
    @media (hover: none) {
        .magnetic-cursor,
        .cursor-follower {
            display: none !important;
        }
    }
`;

// Inject animation CSS
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationCSS;
document.head.appendChild(animationStyleSheet); 