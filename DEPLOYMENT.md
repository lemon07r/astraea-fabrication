# Deployment Guide for Astraea Fabrication

## ✅ Project Status

The Astraea Fabrication landing page has been successfully built with:

- ✅ Eleventy 3.0 static site generator
- ✅ Vite 5.4 build tool with optimal production configuration  
- ✅ Bun package manager
- ✅ Complete SEO implementation (meta tags, schema.org, sitemap)
- ✅ Responsive image optimization (AVIF, WebP, JPEG fallbacks)
- ✅ Minimal JavaScript (1.4KB bundle)
- ✅ HTML minification
- ✅ Proper security headers configuration

## 📊 Build Results

### File Sizes
- **Total site size**: 836KB (including all responsive images)
- **JavaScript bundle**: 1.4KB (minified)
- **HTML (index)**: 183KB (includes inline data)
- **Images**: Multiple responsive versions (320px - 1920px)

### Generated Files
```
_site/
├── index.html (minified)
├── 404.html
├── robots.txt
├── sitemap.xml
├── _headers (Cloudflare headers)
├── favicon.svg
├── site.webmanifest
└── assets/
    ├── main-[hash].js
    └── img/ (responsive images in AVIF, WebP, JPEG)
```

## 🚀 Deployment to Cloudflare Pages

### Option 1: Git Integration (Recommended)

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Astraea Fabrication landing page"
   ```

2. **Push to GitHub/GitLab**:
   ```bash
   git remote add origin https://github.com/yourusername/astraea-fabrication.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Cloudflare Pages**:
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose your repository
   
4. **Configure build settings**:
   - **Build command**: `bun run build`
   - **Build output directory**: `_site`
   - **Root directory**: `/` (leave as default)
   - **Environment variables**:
     - `NODE_VERSION`: `20`
     - `BUN_VERSION`: `latest`

5. **Deploy**: Click "Save and Deploy"

### Option 2: Direct Upload (Wrangler CLI)

1. **Install Wrangler**:
   ```bash
   bun add -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Deploy**:
   ```bash
   bun run build
   wrangler pages deploy _site --project-name=astraea-fabrication
   ```

## 🎨 Customization Guide

### Update Business Information

Edit `src/_data/site.js`:
```javascript
{
  name: 'Your Business Name',
  business: {
    phone: '+1-XXX-XXX-XXXX',
    email: 'your-email@domain.com',
    address: {
      street: 'Your Street',
      city: 'Your City',
      state: 'ST',
      zip: '12345',
    },
    geo: {
      lat: YOUR_LATITUDE,
      lng: YOUR_LONGITUDE,
    },
  },
  // ... more settings
}
```

### Add Real Images

Replace placeholder SVG images in `src/assets/images/` with actual photos:

1. **Gallery images**: `gallery-1.jpg` through `gallery-6.jpg` (600x450px recommended)
2. **OG image**: `public/assets/og-image.jpg` (1200x630px)
3. **Twitter card**: `public/assets/twitter-card.jpg` (1200x600px)
4. **Logo**: `public/assets/logo.svg` or `.jpg`

The build process will automatically:
- Generate responsive sizes (320px, 640px, 768px, 1024px, 1280px, 1920px)
- Convert to AVIF and WebP formats
- Create optimized JPEG fallbacks
- Add lazy loading attributes

### Styling

Customize colors and design:
- **Variables**: `src/assets/css/variables.css`
- **Critical CSS**: `src/assets/css/critical.css` (above-the-fold)
- **Main CSS**: `src/assets/css/main.css` (async-loaded)

### Content

Edit homepage content: `src/index.njk`

## 🔍 SEO Checklist

- ✅ Meta title and description
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ LocalBusiness schema.org JSON-LD
- ✅ XML sitemap
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Semantic HTML structure
- ✅ Image alt attributes
- ⚠️  **TODO**: Add real business coordinates to schema
- ⚠️  **TODO**: Verify Google Search Console
- ⚠️  **TODO**: Submit sitemap to search engines

## 🛠️ Development Workflow

### Local Development
```bash
bun run dev
```
Visit `http://localhost:8080`

### Production Build
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

### Analyze Bundle
```bash
bun run analyze
```
Opens bundle visualization in browser

### Clean Build
```bash
bun run clean
```

## 📈 Performance Optimization Notes

### Current Optimizations
- **Terser minification** with 3 compression passes
- **Brotli + Gzip** compression
- **Image optimization** with Sharp.js
- **Lazy loading** for images
- **HTML minification** (aggressive)
- **Content hashing** for cache busting

### Recommended Next Steps

1. **Critical CSS**: The `rollup-plugin-critical` is configured but may need adjustment for your actual CSS after customization

2. **Real Images**: Replace SVG placeholders with actual high-quality photos for better visual impact

3. **Google Analytics**: Add tracking if needed (remember GDPR compliance)

4. **Contact Form**: Implement backend for contact form using:
   - Cloudflare Workers
   - FormSpree
   - Netlify Forms (if switching)
   - Or a simple mailto link

5. **Custom Domain**: Configure in Cloudflare Pages settings

6. **SSL Certificate**: Automatically provided by Cloudflare

## 🔒 Security Headers

The `_headers` file in `public/` configures:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (disable unnecessary features)
- Cache-Control headers for optimal caching

## 📱 Testing

### Before Going Live

1. **Test responsive design**:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1280px+)

2. **Test in browsers**:
   - Chrome
   - Firefox
   - Safari
   - Edge

3. **Run Lighthouse audit**:
   - Open DevTools in Chrome
   - Go to Lighthouse tab
   - Run audit
   - Target: All scores 95-100

4. **Validate HTML**: https://validator.w3.org/
5. **Test structured data**: https://search.google.com/test/rich-results
6. **Check mobile-friendliness**: https://search.google.com/test/mobile-friendly

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version: `node --version` (should be 20+)
- Check Bun version: `bun --version`
- Clear cache: `bun run clean`
- Reinstall dependencies: `rm -rf node_modules bun.lockb && bun install`

### Images Not Showing
- Verify images exist in `src/assets/images/`
- Check file extensions match (case-sensitive)
- Check browser console for errors

### CSS Not Loading
- CSS files should be in `src/assets/css/`
- Check that paths in `base.njk` are correct
- Verify Vite configuration

## 📞 Support

For issues or questions:
- Review the README.md
- Check Eleventy docs: https://www.11ty.dev/
- Check Vite docs: https://vitejs.dev/
- Cloudflare Pages docs: https://developers.cloudflare.com/pages/

## 🎯 Next Steps

1. **Replace placeholder images** with real photos
2. **Update business info** in `src/_data/site.js`
3. **Customize colors/fonts** in CSS variables
4. **Test locally** with `bun run dev`
5. **Build** with `bun run build`
6. **Deploy** to Cloudflare Pages
7. **Configure custom domain**
8. **Submit to search engines**
9. **Monitor performance** with Lighthouse

---

**Built with ❤️ using Eleventy + Vite + Bun**
