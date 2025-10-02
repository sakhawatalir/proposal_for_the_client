const fs = require('fs');
const path = require('path');

// Simple HTML to PDF conversion using a basic approach
// In a real scenario, you'd use libraries like puppeteer, jsPDF, or similar

const markdownContent = fs.readFileSync('talentpfad_proposal.md', 'utf8');

// Convert markdown to HTML (basic conversion)
function markdownToHtml(markdown) {
  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^\| (.*) \|/gim, (match, content) => {
      const cells = content.split('|').map(cell => `<td>${cell.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    })
    .replace(/^---$/gim, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^<p>(.*)$/gim, '<p>$1')
    .replace(/^(.*)$/gim, '<p>$1</p>');
}

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Talentpfad Job Platform - Project Proposal</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        
        h1 {
            color: #0A66C2;
            border-bottom: 3px solid #0A66C2;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        
        h2 {
            color: #0E1116;
            margin-top: 25px;
            border-left: 4px solid #00C389;
            padding-left: 15px;
        }
        
        h3 {
            color: #0A66C2;
            margin-top: 20px;
        }
        
        h4 {
            color: #0E1116;
            margin-top: 15px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        
        th {
            background-color: #0A66C2;
            color: white;
            font-weight: bold;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .highlight {
            background-color: #00C389;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: bold;
        }
        
        .checkmark {
            color: #00C389;
            font-weight: bold;
        }
        
        .cross {
            color: #dc3545;
            font-weight: bold;
        }
        
        ul, ol {
            margin: 10px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 5px 0;
        }
        
        hr {
            border: none;
            height: 2px;
            background: linear-gradient(to right, #0A66C2, #00C389);
            margin: 30px 0;
        }
        
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #0A66C2;
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }
        
        .pricing-highlight {
            background: linear-gradient(135deg, #0A66C2, #00C389);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
        }
        
        .pricing-highlight h2 {
            color: white;
            border: none;
            padding: 0;
            margin: 0 0 10px 0;
        }
        
        .pricing-highlight .amount {
            font-size: 2.5em;
            font-weight: bold;
            margin: 10px 0;
        }
        
        @media print {
            body {
                max-width: none;
                margin: 0;
                padding: 15px;
            }
            
            h1, h2, h3, h4 {
                page-break-after: avoid;
            }
            
            table {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    ${markdownToHtml(markdownContent)}
    
    <div class="footer">
        <p><strong>Talentpfad Job Platform - Project Proposal</strong></p>
        <p>Confidential and Proprietary Document</p>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
    </div>
</body>
</html>
`;

// Write HTML file
fs.writeFileSync('talentpfad_proposal.html', htmlContent);

console.log('HTML proposal generated successfully!');
console.log('File: talentpfad_proposal.html');
console.log('');
console.log('To convert to PDF:');
console.log('1. Open talentpfad_proposal.html in your browser');
console.log('2. Press Ctrl+P (or Cmd+P on Mac)');
console.log('3. Select "Save as PDF" as destination');
console.log('4. Choose "More settings" and select "Background graphics"');
console.log('5. Click "Save"');
console.log('');
console.log('Alternative: Use online HTML to PDF converters or tools like:');
console.log('- wkhtmltopdf');
console.log('- Puppeteer');
console.log('- Chrome headless mode');

