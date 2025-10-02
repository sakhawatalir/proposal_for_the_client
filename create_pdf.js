const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function createPDF() {
  try {
    // Read the markdown content
    const markdownContent = fs.readFileSync('talentpfad_proposal.md', 'utf8');
    
    // Convert markdown to HTML with better formatting
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Talentpfad Job Platform - Project Proposal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: white;
            font-size: 14px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #0A66C2;
        }
        
        .header h1 {
            color: #0A66C2;
            font-size: 2.5em;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .header .subtitle {
            color: #666;
            font-size: 1.2em;
            font-weight: 400;
        }
        
        .pricing-summary {
            background: linear-gradient(135deg, #0A66C2 0%, #00C389 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            margin: 30px 0;
            box-shadow: 0 10px 30px rgba(10, 102, 194, 0.3);
        }
        
        .pricing-summary h2 {
            color: white;
            font-size: 1.8em;
            margin-bottom: 15px;
            border: none;
            padding: 0;
        }
        
        .pricing-summary .amount {
            font-size: 3em;
            font-weight: 700;
            margin: 15px 0;
        }
        
        .pricing-summary .rate {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        h1 {
            color: #0A66C2;
            font-size: 2em;
            font-weight: 600;
            margin: 40px 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #0A66C2;
        }
        
        h2 {
            color: #0E1116;
            font-size: 1.5em;
            font-weight: 600;
            margin: 30px 0 15px 0;
            padding-left: 15px;
            border-left: 4px solid #00C389;
        }
        
        h3 {
            color: #0A66C2;
            font-size: 1.3em;
            font-weight: 600;
            margin: 25px 0 10px 0;
        }
        
        h4 {
            color: #0E1116;
            font-size: 1.1em;
            font-weight: 600;
            margin: 20px 0 8px 0;
        }
        
        p {
            margin: 10px 0;
            text-align: justify;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        th {
            background: linear-gradient(135deg, #0A66C2, #0E1116);
            color: white;
            padding: 15px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 0.9em;
        }
        
        td {
            padding: 12px;
            border-bottom: 1px solid #e5e5e5;
            vertical-align: top;
        }
        
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        tr:hover {
            background-color: #e3f2fd;
        }
        
        ul, ol {
            margin: 15px 0;
            padding-left: 30px;
        }
        
        li {
            margin: 8px 0;
            line-height: 1.5;
        }
        
        .checkmark {
            color: #00C389;
            font-weight: bold;
        }
        
        .cross {
            color: #dc3545;
            font-weight: bold;
        }
        
        .highlight {
            background: linear-gradient(135deg, #00C389, #0A66C2);
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.9em;
        }
        
        .timeline-phase {
            background: #f8f9fa;
            border-left: 4px solid #0A66C2;
            padding: 20px;
            margin: 15px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .timeline-phase h4 {
            color: #0A66C2;
            margin-top: 0;
        }
        
        .tech-stack {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .tech-category {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e5e5e5;
        }
        
        .tech-category h4 {
            color: #0A66C2;
            margin-bottom: 10px;
        }
        
        .footer {
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #0A66C2;
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }
        
        .contact-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        
        .contact-info h3 {
            color: #0A66C2;
            margin-bottom: 15px;
        }
        
        .contact-info p {
            margin: 5px 0;
        }
        
        @media print {
            .container {
                max-width: none;
                padding: 20px;
            }
            
            h1, h2, h3, h4 {
                page-break-after: avoid;
            }
            
            table {
                page-break-inside: avoid;
            }
            
            .timeline-phase {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Talentpfad Job Platform</h1>
            <div class="subtitle">Project Proposal & Technical Specification</div>
        </div>
        
        <div class="pricing-summary">
            <h2>Project Investment</h2>
            <div class="amount">$31,460</div>
            <div class="rate">$22/hour × 1,430 hours</div>
            <p>65-day delivery timeline • All-inclusive pricing</p>
        </div>
        
        ${convertMarkdownToHTML(markdownContent)}
        
        <div class="contact-info">
            <h3>Ready to Get Started?</h3>
            <p><strong>Developer:</strong> [Your Name]</p>
            <p><strong>Email:</strong> [Your Email]</p>
            <p><strong>Phone:</strong> [Your Phone]</p>
            <p><strong>Portfolio:</strong> [Your Portfolio URL]</p>
            <p><strong>LinkedIn:</strong> [Your LinkedIn Profile]</p>
        </div>
        
        <div class="footer">
            <p><strong>Talentpfad Job Platform - Project Proposal</strong></p>
            <p>Confidential and Proprietary Document</p>
            <p>Generated on: ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</p>
        </div>
    </div>
</body>
</html>
    `;
    
    // Write HTML file
    fs.writeFileSync('talentpfad_proposal_styled.html', htmlContent);
    
    // Launch Puppeteer and create PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      path: 'Talentpfad_Job_Platform_Proposal.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; color: #666;">Talentpfad Job Platform - Project Proposal</div>',
      footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; color: #666;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
    });
    
    await browser.close();
    
    console.log('✅ PDF created successfully!');
    console.log('📄 File: Talentpfad_Job_Platform_Proposal.pdf');
    console.log('🎨 Styled HTML: talentpfad_proposal_styled.html');
    
  } catch (error) {
    console.error('❌ Error creating PDF:', error.message);
    console.log('📝 Fallback: Use the HTML file and convert manually');
  }
}

function convertMarkdownToHTML(markdown) {
  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^✅ (.*$)/gim, '<li class="checkmark">✅ $1</li>')
    .replace(/^❌ (.*$)/gim, '<li class="cross">❌ $1</li>')
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

// Run the function
createPDF();

