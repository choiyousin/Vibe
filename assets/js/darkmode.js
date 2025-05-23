// ===== DARK MODE FUNCTIONALITY =====

// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Listen for system theme changes
        this.watchSystemTheme();
        
        // Update toggle button icon
        this.updateToggleIcon();
    }
    
    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    getStoredTheme() {
        return localStorage.getItem('theme');
    }
    
    setStoredTheme(theme) {
        localStorage.setItem('theme', theme);
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.setStoredTheme(theme);
        this.updateToggleIcon();
        this.updateMetaThemeColor();
        
        // Dispatch custom event for theme change
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: theme }
        }));
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation class for smooth transition
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }
    
    updateToggleIcon() {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    updateMetaThemeColor() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const color = this.currentTheme === 'light' ? '#ffffff' : '#0f172a';
            metaThemeColor.setAttribute('content', color);
        }
    }
    
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Advanced theme features
class AdvancedThemeFeatures {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.init();
    }
    
    init() {
        this.addThemeTransitions();
        this.handleImageThemes();
        this.addThemeBasedAnimations();
        this.setupAutoThemeSchedule();
    }
    
    addThemeTransitions() {
        // Add CSS for smooth theme transitions
        const style = document.createElement('style');
        style.textContent = `
            .theme-transitioning,
            .theme-transitioning *,
            .theme-transitioning *:before,
            .theme-transitioning *:after {
                transition: background-color 0.3s ease,
                           color 0.3s ease,
                           border-color 0.3s ease,
                           box-shadow 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleImageThemes() {
        // Handle images that should change based on theme
        const themeImages = document.querySelectorAll('[data-light-src][data-dark-src]');
        
        const updateImages = () => {
            themeImages.forEach(img => {
                const lightSrc = img.getAttribute('data-light-src');
                const darkSrc = img.getAttribute('data-dark-src');
                const currentTheme = this.themeManager.currentTheme;
                
                img.src = currentTheme === 'light' ? lightSrc : darkSrc;
            });
        };
        
        // Update images on theme change
        window.addEventListener('themechange', updateImages);
        updateImages(); // Initial update
    }
    
    addThemeBasedAnimations() {
        window.addEventListener('themechange', (e) => {
            const theme = e.detail.theme;
            
            // Add theme-specific classes for animations
            document.body.classList.remove('light-theme-animations', 'dark-theme-animations');
            document.body.classList.add(`${theme}-theme-animations`);
            
            // Trigger special effects for theme change
            this.createThemeChangeEffect(theme);
        });
    }
    
    createThemeChangeEffect(theme) {
        // Create a ripple effect from the toggle button
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        
        const rect = toggle.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: ${theme === 'dark' ? '#0f172a' : '#ffffff'};
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        `;
        
        document.body.appendChild(ripple);
        
        // Trigger animation
        requestAnimationFrame(() => {
            const size = Math.max(window.innerWidth, window.innerHeight) * 2;
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
        });
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    setupAutoThemeSchedule() {
        // Optional: Auto-switch theme based on time of day
        const autoThemeEnabled = localStorage.getItem('autoTheme') === 'true';
        
        if (autoThemeEnabled) {
            this.scheduleThemeChanges();
        }
    }
    
    scheduleThemeChanges() {
        const now = new Date();
        const hour = now.getHours();
        
        // Switch to dark mode at 6 PM, light mode at 6 AM
        const shouldBeDark = hour >= 18 || hour < 6;
        const targetTheme = shouldBeDark ? 'dark' : 'light';
        
        if (this.themeManager.currentTheme !== targetTheme) {
            this.themeManager.setTheme(targetTheme);
        }
        
        // Schedule next check
        setTimeout(() => {
            this.scheduleThemeChanges();
        }, 60000); // Check every minute
    }
}

// Theme preferences panel
class ThemePreferences {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.createPreferencesPanel();
    }
    
    createPreferencesPanel() {
        // Create a hidden preferences panel
        const panel = document.createElement('div');
        panel.id = 'theme-preferences';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: var(--bg-card);
            border: 1px solid var(--text-muted);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
            min-width: 300px;
        `;
        
        panel.innerHTML = `
            <h3>테마 설정</h3>
            <div class="theme-options">
                <label>
                    <input type="radio" name="theme" value="light" ${this.themeManager.currentTheme === 'light' ? 'checked' : ''}>
                    <span>라이트 모드</span>
                </label>
                <label>
                    <input type="radio" name="theme" value="dark" ${this.themeManager.currentTheme === 'dark' ? 'checked' : ''}>
                    <span>다크 모드</span>
                </label>
                <label>
                    <input type="radio" name="theme" value="auto" ${!localStorage.getItem('theme') ? 'checked' : ''}>
                    <span>시스템 설정 따르기</span>
                </label>
            </div>
            <div class="theme-features">
                <label>
                    <input type="checkbox" id="auto-theme" ${localStorage.getItem('autoTheme') === 'true' ? 'checked' : ''}>
                    <span>시간에 따른 자동 전환</span>
                </label>
            </div>
            <div class="theme-actions">
                <button id="close-preferences">닫기</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupPanelEvents(panel);
    }
    
    setupPanelEvents(panel) {
        // Theme selection
        const themeInputs = panel.querySelectorAll('input[name="theme"]');
        themeInputs.forEach(input => {
            input.addEventListener('change', () => {
                if (input.value === 'auto') {
                    localStorage.removeItem('theme');
                    this.themeManager.setTheme(this.themeManager.getSystemTheme());
                } else {
                    this.themeManager.setTheme(input.value);
                }
            });
        });
        
        // Auto theme toggle
        const autoThemeCheckbox = panel.querySelector('#auto-theme');
        autoThemeCheckbox.addEventListener('change', () => {
            localStorage.setItem('autoTheme', autoThemeCheckbox.checked);
        });
        
        // Close button
        panel.querySelector('#close-preferences').addEventListener('click', () => {
            this.hidePanel();
        });
        
        // Show panel on long press of theme toggle
        let longPressTimer;
        const themeToggle = document.getElementById('theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('mousedown', () => {
                longPressTimer = setTimeout(() => {
                    this.showPanel();
                }, 1000);
            });
            
            themeToggle.addEventListener('mouseup', () => {
                clearTimeout(longPressTimer);
            });
            
            themeToggle.addEventListener('mouseleave', () => {
                clearTimeout(longPressTimer);
            });
        }
    }
    
    showPanel() {
        const panel = document.getElementById('theme-preferences');
        panel.style.opacity = '1';
        panel.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    
    hidePanel() {
        const panel = document.getElementById('theme-preferences');
        panel.style.opacity = '0';
        panel.style.transform = 'translate(-50%, -50%) scale(0)';
    }
}

// Theme-aware components
class ThemeAwareComponents {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCodeHighlighting();
        this.setupCharts();
        this.setupMaps();
    }
    
    setupCodeHighlighting() {
        // Update code syntax highlighting based on theme
        window.addEventListener('themechange', (e) => {
            const theme = e.detail.theme;
            const codeBlocks = document.querySelectorAll('.code-content');
            
            codeBlocks.forEach(block => {
                block.setAttribute('data-theme', theme);
            });
        });
    }
    
    setupCharts() {
        // Update chart colors based on theme
        window.addEventListener('themechange', (e) => {
            const theme = e.detail.theme;
            // This would integrate with chart libraries like Chart.js
            // to update colors when theme changes
        });
    }
    
    setupMaps() {
        // Update map styles based on theme
        window.addEventListener('themechange', (e) => {
            const theme = e.detail.theme;
            // This would integrate with map libraries like Mapbox
            // to update map styles when theme changes
        });
    }
}

// Initialize theme system
document.addEventListener('DOMContentLoaded', function() {
    const themeManager = new ThemeManager();
    const advancedFeatures = new AdvancedThemeFeatures(themeManager);
    const preferences = new ThemePreferences(themeManager);
    const themeAwareComponents = new ThemeAwareComponents();
    
    // Add meta theme-color tag if it doesn't exist
    if (!document.querySelector('meta[name="theme-color"]')) {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = themeManager.currentTheme === 'light' ? '#ffffff' : '#0f172a';
        document.head.appendChild(meta);
    }
    
    // Expose theme manager globally for debugging
    window.themeManager = themeManager;
});

// CSS custom properties for theme transitions
const themeTransitionCSS = `
    :root {
        --theme-transition: background-color 0.3s ease,
                           color 0.3s ease,
                           border-color 0.3s ease,
                           box-shadow 0.3s ease;
    }
    
    * {
        transition: var(--theme-transition);
    }
    
    .theme-transitioning * {
        transition-duration: 0.3s !important;
    }
    
    /* Theme-specific animations */
    .light-theme-animations .floating-shapes .shape {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    }
    
    .dark-theme-animations .floating-shapes .shape {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
    }
    
    /* Theme preferences panel styles */
    #theme-preferences {
        color: var(--text-primary);
    }
    
    #theme-preferences h3 {
        margin-bottom: var(--spacing-md);
        color: var(--text-primary);
    }
    
    #theme-preferences .theme-options,
    #theme-preferences .theme-features {
        margin-bottom: var(--spacing-md);
    }
    
    #theme-preferences label {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-xs);
        cursor: pointer;
    }
    
    #theme-preferences input[type="radio"],
    #theme-preferences input[type="checkbox"] {
        accent-color: var(--primary-color);
    }
    
    #theme-preferences .theme-actions {
        text-align: right;
    }
    
    #theme-preferences button {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: var(--spacing-xs) var(--spacing-md);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: var(--theme-transition);
    }
    
    #theme-preferences button:hover {
        background: var(--primary-dark);
    }
`;

// Inject theme transition CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = themeTransitionCSS;
document.head.appendChild(styleSheet); 