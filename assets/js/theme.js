// ============================================
// FILE: assets/js/theme.js
// PURPOSE: Detects, applies, and persists the user's theme preference
// ============================================

(function () {
    function getSavedTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) { }
    }

    function getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }

    // Initialize theme
    let currentTheme = getSavedTheme();
    if (!currentTheme) {
        currentTheme = getSystemTheme();
    }
    applyTheme(currentTheme);

    // Setup toggle button when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                const isDark = document.documentElement.classList.contains('dark-mode');
                const newTheme = isDark ? 'light' : 'dark';
                applyTheme(newTheme);
                saveTheme(newTheme);
            });
        }
    });

    // Listen for system preference changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!getSavedTheme()) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
})();

