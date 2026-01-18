const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Load template
const templatePath = path.join(__dirname, 'src', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Build header links
let headerLinks = '';
if (config.subpages.investors) {
    headerLinks = '<a href="login.html">Investors Login</a>';
}

// Build footer links
let footerLinks = '';
const subpages = config.subpages;
if (subpages.whoWeAre) footerLinks += '<a href="javascript:void(0)" id="who-we-are-link">Who We Are</a>';
if (subpages.blogs) footerLinks += '<a href="javascript:void(0)">Blogs</a>';

// Shared address block
const addressBlock = `
<div class="footer-address">
    <div class="footer-address-city">Bengaluru India</div>
    <div class="footer-address-details">
        <strong>O4F LLP</strong>
        3rd Cross, Sector 2, HSR Layout<br>
        Bengaluru, Karnataka 560102
    </div>
</div>`;

// Replace placeholders function
function replacePlaceholders(tmpl, customFooterLinks, customAddressBlock) {
    const activeFooterLinks = customFooterLinks !== undefined ? customFooterLinks : footerLinks;
    const activeAddressBlock = customAddressBlock !== undefined ? customAddressBlock : addressBlock;

    return tmpl
        .replace(/{{companyName}}/g, config.companyName)
        .replace(/{{faviconPath}}/g, config.faviconPath)
        .replace(/{{companyShort}}/g, config.companyShort)
        .replace(/{{logoTagline}}/g, config.logoTagline)
        .replace(/{{tagline}}/g, config.tagline)
        .replace(/{{introduction}}/g, config.introduction)
        .replace(/{{moreContent}}/g, config.moreContent)
        .replace(/{{heroImagePath}}/g, config.heroImagePath)
        .replace(/{{headerLinks}}/g, headerLinks)
        .replace(/{{footerLinks}}/g, activeFooterLinks)
        .replace(/{{addressBlock}}/g, activeAddressBlock)
        .replace(/{{whoWeAreData}}/g, JSON.stringify(config.whoWeAreContent).replace(/"/g, '&quot;'));
}

// Generate index.html
const indexOutput = replacePlaceholders(template);
fs.writeFileSync(path.join(__dirname, 'index.html'), indexOutput);
console.log('Successfully generated index.html');

// Generate login.html
const loginTemplatePath = path.join(__dirname, 'src', 'login_template.html');
if (fs.existsSync(loginTemplatePath)) {
    const loginTemplate = fs.readFileSync(loginTemplatePath, 'utf8');
    // Login page should not have Who We Are or Blogs subpages in footer, and no address block
    const loginOutput = replacePlaceholders(loginTemplate, '', '');
    fs.writeFileSync(path.join(__dirname, 'login.html'), loginOutput);
    console.log('Successfully generated login.html');
}
