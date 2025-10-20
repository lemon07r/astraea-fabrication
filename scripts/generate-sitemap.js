import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = 'https://astraeafabrication.com';
const outputDir = path.join(__dirname, '..', '_site');

// Pages to include in sitemap
const pages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  // Add more pages here as needed
];

async function generateSitemap() {
  const now = new Date().toISOString();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  const sitemapPath = path.join(outputDir, 'sitemap.xml');
  await fs.writeFile(sitemapPath, sitemap, 'utf-8');
  console.log(`✓ Generated sitemap.xml (${pages.length} pages)`);
}

generateSitemap().catch(console.error);
