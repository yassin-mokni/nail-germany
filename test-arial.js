const fs = require('fs');

let svg = fs.readFileSync('/tmp/clean_og.svg', 'utf8');
svg = svg.replace(/font-family:system-ui[^;]+;/g, 'font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;');
fs.writeFileSync('/tmp/clean_og_arial.svg', svg);
