const fs = require('fs');
let content = fs.readFileSync('c:\\Users\\musst\\Desktop\\student-finance-hub\\index.html', 'utf-8');
const badDesc = '<meta name="description"\r\n        content="Free scholarship eligibility checker and student finance tools for Pakistani students. Find HEC, provincial, and international scholarships you qualify for instantly.">';
const badDesc2 = '<meta name="description"\n        content="Free scholarship eligibility checker and student finance tools for Pakistani students. Find HEC, provincial, and international scholarships you qualify for instantly.">';
const goodDesc = '<meta name="description" content="Free scholarship eligibility checker and student finance tools for Pakistani students. Find HEC, provincial, and international scholarships you qualify for instantly.">';

if (content.includes(badDesc)) {
    content = content.replace(badDesc, goodDesc);
} else if (content.includes(badDesc2)) {
    content = content.replace(badDesc2, goodDesc);
} else {
    // Regex fallback
    content = content.replace(/<meta name="description"[\s\S]*?content="Free scholarship eligibility checker and student finance tools for Pakistani students. Find HEC, provincial, and international scholarships you qualify for instantly.">/g, goodDesc);
}

fs.writeFileSync('c:\\Users\\musst\\Desktop\\student-finance-hub\\index.html', content, 'utf-8');
console.log("Fixed index.html");
