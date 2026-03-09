const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\musst\\Desktop\\student-finance-hub';
const files = [
    'index.html',
    'eligibility-checker.html',
    'loan-calculator.html',
    'cgpa-calculator.html',
    'deadlines.html',
    'scholarships.html',
    'about.html',
    'privacy-policy.html'
];

files.forEach(f => {
    let p = path.join(dir, f);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf-8');

    // First, remove the button from its current location inside navbarNav
    // We match the exact button block.
    const toggleRegex = /\s*<button id="theme-toggle"[\s\S]*?<\/button>\s*/;
    content = content.replace(toggleRegex, '\n            ');

    // Make sure we don't accidentally add it twice if the script is run again
    if (!content.includes('d-flex align-items-center ms-auto ms-lg-3 order-lg-3')) {
        const brandTogglerRegex = /(<a class="navbar-brand logo"[^>]*>PakStudentFinance<\/a>)\s*(<button class="navbar-toggler)/i;
        const newDiv = `$1\n            <div class="d-flex align-items-center ms-auto ms-lg-3 order-lg-3">\n                <button id="theme-toggle" class="btn-theme-toggle me-2 me-lg-0" aria-label="Toggle dark mode">\n                    <span class="icon-sun">☀️</span>\n                    <span class="icon-moon">🌙</span>\n                </button>\n            </div>\n            $2`;
        content = content.replace(brandTogglerRegex, newDiv);
    }

    fs.writeFileSync(p, content, 'utf-8');
});

// Append to main.css
const cssPath = path.join(dir, 'assets', 'css', 'main.css');
if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf-8');
    if (!cssContent.includes('@media (max-width: 991.98px)')) {
        cssContent += `\n@media (max-width: 991.98px) {\n  .btn-theme-toggle {\n    padding: 4px 8px;\n    font-size: 0.85rem;\n  }\n}\n`;
        fs.writeFileSync(cssPath, cssContent, 'utf-8');
    }
}

console.log('Update complete.');
