const fs = require('fs');

function fixHtmlHead(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove the duplicated html/head declaration
    const badHeader = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">`;

    const goodHeader = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">`;

    if (content.includes(badHeader)) {
        content = content.replace(badHeader, goodHeader);
    }

    // Also remove the extra spaces/indentation for the next few lines up to <title>
    // We will just do a simpler regex replace for the header of the document up to the first title.

    const correctHead = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[DESC]">
    <meta property="og:url" content="https://mustafa-shah-tech.github.io/student-finance-hub/[FILE]">
    <title>[TITLE]</title>
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size=''90''>🎓</text></svg>">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Shared Styles -->
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/components.css">
</head>`;

    if (filePath.includes("eligibility-checker.html")) {
        const replacement = correctHead
            .replace("[DESC]", "Enter your CGPA, degree level and province to instantly find every Pakistani scholarship you qualify for. Free eligibility checker — no signup required.")
            .replace("[FILE]", "eligibility-checker.html")
            .replace("[TITLE]", "Eligibility Checker - Pakistan Student Finance Hub");

        content = content.replace(/<!DOCTYPE html>[\s\S]*?<\/head>/i, replacement);
    } else if (filePath.includes("loan-calculator.html")) {
        const replacement = correctHead
            .replace("[DESC]", "Calculate monthly installments for Pakistani student loans including PM Youth Loan, HBL and Bank Alfalah education loans. Free EMI calculator in PKR.")
            .replace("[FILE]", "loan-calculator.html")
            .replace("[TITLE]", "Loan Calculator - Pakistan Student Finance Hub");

        content = content.replace(/<!DOCTYPE html>[\s\S]*?<\/head>/i, replacement);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
}

fixHtmlHead('c:\\Users\\musst\\Desktop\\student-finance-hub\\eligibility-checker.html');
fixHtmlHead('c:\\Users\\musst\\Desktop\\student-finance-hub\\loan-calculator.html');
console.log("Fixed headers");
