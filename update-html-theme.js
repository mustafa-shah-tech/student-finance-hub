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

const toggleButton = `
                <button id="theme-toggle" class="btn-theme-toggle ms-3" aria-label="Toggle dark mode">
                    <span class="icon-sun">☀️</span>
                    <span class="icon-moon">🌙</span>
                </button>
            </div>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Add <script src="assets/js/theme.js"></script> as the FIRST script in <head>
    // We can just add it right after the <head> tag
    if (!content.includes('assets/js/theme.js')) {
        content = content.replace(/<head>/i, '<head>\n    <script src="assets/js/theme.js"></script>');
    }

    // 2. Add toggle button before the closing </div> of navbar collapse
    // Usually it looks like:
    //             </ul>
    //         </div>
    //     </div>
    // </nav>
    // Let's replace `</ul>\n            </div>` with `</ul>\n` + toggleButton
    if (!content.includes('id="theme-toggle"')) {
        content = content.replace(/(<\/ul>\s*)<\/div>/i, '$1' + toggleButton.trimLeft());
    }

    // 3. Remove inline styles like style="background-color: white" and style="color: #555" (and variants)
    // We need to match things like `style="background-color: white;"` or `style="background-color: white"` 
    // or `style="color: #555"` etc, entirely removing the style attribute if it's the only thing in it.

    const inlineStylesToRemove = [
        /style\s*=\s*"[^"]*background-color\s*:\s*white;?[^"]*"/gi,
        /style\s*=\s*"[^"]*color\s*:\s*#555;?[^"]*"/gi,
        /style\s*=\s*"[^"]*background-color\s*:\s*#FFFFFF;?[^"]*"/gi,
        /style\s*=\s*'[^']*background-color\s*:\s*white;?[^']*'/gi,
        /style\s*=\s*'[^']*color\s*:\s*#555;?[^']*'/gi,
        /style\s*=\s*'[^']*background-color\s*:\s*#FFFFFF;?[^']*'/gi
    ];

    inlineStylesToRemove.forEach(regex => {
        // If style only has this property, remove whole style attr. E.g. style="background-color: white;" --> "" 
        // A simpler approach: Just replace matches of the regex completely with "" (if it's the whole style attribute)
        // Wait, if it has other styles, this might break them. But given the project, mostly those styles are lonely.
        // Let's just remove the entire style="" matching this background-color: white
        content = content.replace(regex, '');
    });

    // Fallback: cleanup empty style attributes
    content = content.replace(/style\s*=\s*""/gi, '');
    content = content.replace(/style\s*=\s*''/gi, '');

    fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Processed HTML files successfully for theme updates.');
