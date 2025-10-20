# ✅ Sitemap Generation Fixed

## Problem

The sitemap.xml file was not appearing in the final build output despite Eleventy generating it. The issue was caused by the Eleventy Vite plugin's build process:

1. Eleventy writes sitemap.xml to `_site/`
2. Vite plugin renames `_site/` to `.11ty-vite/`
3. Vite processes files (JS, CSS, HTML, images)
4. Vite outputs to `_site/`
5. XML files were not being copied over during this process

### Why Template-Based Approach Failed

- Adding XML to `templateFormats` didn't help
- Using `assetsInclude: ['**/*.xml']` in Vite config didn't work
- Setting `emptyOutDir: false` didn't solve it
- Even `@quasibit/eleventy-plugin-sitemap` plugin failed
- The Vite plugin's directory manipulation filtered out XML files

## Solution

**Post-build script approach** - Generate sitemap.xml AFTER the Vite build completes.

### Implementation

#### 1. Created Post-Build Script

File: `scripts/generate-sitemap.js`

```javascript
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
```

#### 2. Updated Build Command

File: `package.json`

```json
{
  "scripts": {
    "build": "eleventy && node scripts/generate-sitemap.js"
  }
}
```

#### 3. Added Note in Eleventy Config

File: `.eleventy.js`

```javascript
// Note: sitemap.xml is generated post-build by scripts/generate-sitemap.js
```

### Configuration Changes Made

1. **Removed unused sitemap template** (`src/sitemap.xml.njk`)
2. **Removed `@quasibit/eleventy-plugin-sitemap`** plugin (didn't work with Vite)
3. **Removed event handler** that tried to copy files from temp folder
4. **Added Vite `assetsInclude`** (kept for future reference, though not needed with post-build approach)
5. **Added Vite `emptyOutDir: false`** (prevents clearing directory)

## Results

### Build Output

```
✓ built in 430ms
[11ty] Copied 23 Wrote 3 files in 2.95 seconds (983.3ms each, v3.1.2)
✓ Generated sitemap.xml (1 pages)
```

### Generated Sitemap

File: `_site/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://astraeafabrication.com/</loc>
    <lastmod>2025-10-20T12:49:20.964Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Validation

- ✅ **File exists**: `_site/sitemap.xml` (288 bytes)
- ✅ **Valid XML**: Passes `xmllint --noout` validation
- ✅ **Proper structure**: Follows sitemap.org schema
- ✅ **Referenced in robots.txt**: `Sitemap: https://astraeafabrication.com/sitemap.xml`

## Benefits of This Approach

### Advantages

1. ✅ **Reliable** - Works regardless of Vite's build process
2. ✅ **Simple** - Easy to understand and maintain
3. ✅ **Flexible** - Easy to customize pages array
4. ✅ **Fast** - Runs in milliseconds
5. ✅ **Portable** - Works with any build system
6. ✅ **Debuggable** - Clear logs and error handling

### Disadvantages

1. ⚠️ **Manual maintenance** - Pages must be added to array manually
2. ⚠️ **No automatic date tracking** - Uses current date for all pages
3. ⚠️ **Separate from Eleventy** - Not integrated with collections

## Future Enhancements

### Option 1: Auto-Generate from _site Directory

Scan `_site/` for HTML files and generate sitemap dynamically:

```javascript
async function scanPages(dir) {
  const files = await fs.readdir(dir, { recursive: true });
  return files
    .filter(f => f.endsWith('.html') && !f.includes('404'))
    .map(f => ({
      url: `/${f.replace('index.html', '').replace('.html', '')}`,
      priority: '0.8',
      changefreq: 'monthly',
    }));
}
```

### Option 2: Use Eleventy Data

Create a data file that both Eleventy and the sitemap script can read:

```javascript
// src/_data/pages.js
export default [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about/', priority: '0.8', changefreq: 'monthly' },
  // ...
];
```

### Option 3: JSON Manifest

Have Eleventy write a JSON file of all pages, then read it in the script:

```javascript
// In .eleventy.js
eleventyConfig.on('eleventy.after', async ({ dir }) => {
  const manifest = collections.all.map(page => ({
    url: page.url,
    date: page.date,
  }));
  await fs.writeFile('_site/pages.json', JSON.stringify(manifest));
});

// In generate-sitemap.js
const manifest = JSON.parse(await fs.readFile('_site/pages.json'));
```

## Adding More Pages

To add pages to the sitemap, edit `scripts/generate-sitemap.js`:

```javascript
const pages = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/about/', priority: '0.8', changefreq: 'monthly' },
  { url: '/services/', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact/', priority: '0.7', changefreq: 'monthly' },
  { url: '/gallery/', priority: '0.7', changefreq: 'weekly' },
  // Add more pages here
];
```

### Priority Guidelines

- **1.0**: Homepage
- **0.8**: Main pages (About, Services)
- **0.7**: Secondary pages (Contact, Gallery)
- **0.5**: Blog posts, articles
- **0.3**: Archives, tags

### Change Frequency Guidelines

- **daily**: Blog home, news feed
- **weekly**: Gallery, portfolio
- **monthly**: Main pages, services
- **yearly**: About, contact, static content

## Testing

### Local Testing

```bash
# Build site
bun run build

# Check sitemap exists
ls -lh _site/sitemap.xml

# Validate XML
xmllint --noout _site/sitemap.xml && echo "Valid!"

# View content
cat _site/sitemap.xml
```

### After Deployment

1. **Test URL**: `https://astraeafabrication.com/sitemap.xml`
2. **Submit to Google**: https://search.google.com/search-console
3. **Submit to Bing**: https://www.bing.com/webmasters
4. **Validate**: https://www.xml-sitemaps.com/validate-xml-sitemap.html

## Maintenance

### When Adding New Pages

1. Create the page in Eleventy (e.g., `src/about.njk`)
2. Add entry to `scripts/generate-sitemap.js` pages array
3. Build and verify sitemap includes new page

### Regular Updates

- Update `changefreq` if content changes frequently
- Adjust `priority` based on page importance
- Remove pages that are deleted
- Check sitemap after major site updates

## Troubleshooting

### Sitemap not generated

**Check**: Did the build complete successfully?
```bash
bun run build
# Look for: ✓ Generated sitemap.xml (X pages)
```

### Sitemap is empty

**Check**: Is the pages array populated?
```javascript
console.log('Pages:', pages);  // Add before generateSitemap()
```

### Invalid XML

**Validate**: Run xmllint
```bash
xmllint --noout _site/sitemap.xml
```

### Wrong URLs

**Check**: Verify `siteUrl` in script matches production domain
```javascript
const siteUrl = 'https://astraeafabrication.com';  // Must match deployment
```

## Related Files

- `scripts/generate-sitemap.js` - Sitemap generator
- `package.json` - Build command configuration
- `.eleventy.js` - Note about post-build generation
- `_site/robots.txt` - References sitemap URL
- `_site/sitemap.xml` - Generated sitemap (not in git)

## Status

- ✅ **Working**: Sitemap generated on every build
- ✅ **Validated**: XML structure is correct
- ✅ **Referenced**: robots.txt points to sitemap
- ✅ **Ready**: For deployment and search engine submission

---

**Last Updated**: After implementing post-build script solution
**Status**: ✅ Fully Fixed and Working
**Build**: ✅ Successful (430ms + sitemap generation)
**Output**: ✅ Valid XML (288 bytes)
**Ready**: ✅ For production deployment
