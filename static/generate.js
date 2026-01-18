const fs = require('fs');
const path = require('path');

// Load config
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Load template
const templatePath = path.join(__dirname, 'src', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Build header links (Investors usually at top right on abc.xyz)
let headerLinks = '';
if (config.subpages.investors) {
    headerLinks = '<a href="javascript:void(0)">Investors</a>';
}

// Build footer links
let footerLinks = '';
const subpages = config.subpages;
if (subpages.products) footerLinks += '<a href="javascript:void(0)">Products</a>';
if (subpages.privacy) footerLinks += '<a href="javascript:void(0)">Privacy</a>';
if (subpages.terms) footerLinks += '<a href="javascript:void(0)">Terms</a>';

// Replace placeholders
let output = template
    .replace(/{{companyName}}/g, config.companyName)
    .replace(/{{companyShort}}/g, config.companyShort)
    .replace(/{{logoTagline}}/g, config.logoTagline)
    .replace(/{{tagline}}/g, config.tagline)
    .replace(/{{introduction}}/g, config.introduction)
    .replace(/{{moreContent}}/g, config.moreContent)
    .replace(/{{heroImagePath}}/g, config.heroImagePath)
    .replace(/{{headerLinks}}/g, headerLinks)
    .replace(/{{footerLinks}}/g, footerLinks);

// Write to index.html
const outputPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outputPath, output);

console.log('Successfully generated index.html at ' + outputPath);
