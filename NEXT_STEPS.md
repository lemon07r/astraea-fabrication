# Next Steps & Important TODOs

## ✅ Completed

1. ✅ Project structure created
2. ✅ Eleventy + Vite integration configured
3. ✅ Production build optimization (Terser, compression, image optimization)
4. ✅ SEO implementation (meta tags, schema.org)
5. ✅ Responsive design CSS
6. ✅ Minimal JavaScript bundle (1.4KB)
7. ✅ HTML minification
8. ✅ Security headers configured
9. ✅ Build process tested and working

## 🔧 Important Configuration Fixes Needed

### 1. CSS Processing Issue
**Problem**: CSS files are currently linked but not processed through Vite.

**Solution Options**:
A. Import CSS in JavaScript (recommended for Vite):
   ```javascript
   // In src/assets/js/main.js
   import '../css/critical.css'
   import '../css/main.css'
   ```
   
B. Use Eleventy's CSS passthrough and process separately with PostCSS

**Impact**: Currently CSS won't load properly in production

### 2. Sitemap Generation
**Issue**: Sitemap.xml template exists but isn't being generated

**Fix**: Check if sitemap.xml.njk needs adjustment or if there's a build configuration issue

### 3. Critical CSS Plugin
**Status**: Configured but may fail silently

**Todo**: Test and verify rollup-plugin-critical is working correctly after CSS is properly integrated

## 🎨 Content Updates Needed

### High Priority

1. **Replace Placeholder Images**:
   - Current: SVG placeholders in `src/assets/images/`
   - Needed: Real photos of countertop installations
   - Format: JPEG or PNG, 1200px+ width recommended
   - Files needed:
     - gallery-1.jpg through gallery-6.jpg
     - og-image.jpg (1200x630px for social sharing)
     - twitter-card.jpg (1200x600px)
     - logo.svg or logo.png

2. **Update Business Information**:
   - File: `src/_data/site.js`
   - Update:
     - Business name (currently "Astraea Fabrication")
     - Phone number (placeholder: +1-555-123-4567)
     - Email address
     - Physical address
     - Geographic coordinates (for schema.org and maps)
     - Social media links
     - Business hours

3. **Customize Branding**:
   - File: `src/assets/css/variables.css`
   - Update colors to match brand
   - Consider changing:
     - Primary color (currently #2c3e50 - dark blue)
     - Accent color (currently #e67e22 - orange)
     - Font families if desired

### Medium Priority

4. **Add Favicon Files**:
   - Generate proper favicons (multiple sizes)
   - Tools: https://realfavicongenerator.net/
   - Add to `public/` directory:
     - favicon.ico
     - favicon-32x32.png
     - apple-touch-icon.png
     - android-chrome-192x192.png
     - android-chrome-512x512.png

5. **Enhance Content**:
   - Add more detailed service descriptions
   - Include pricing information (if desired)
   - Add customer testimonials
   - Include certifications/awards
   - Add more gallery images

6. **Contact Form** (if needed):
   - Options:
     - Cloudflare Workers function
     - FormSpree integration
     - Simple mailto link
     - Third-party form service

## 🚀 Deployment Steps

### Pre-Deployment Checklist

- [ ] Fix CSS processing issue
- [ ] Replace all placeholder images with real photos
- [ ] Update all business information
- [ ] Test build: `bun run build`
- [ ] Test preview: `bun run preview`
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit (target 95+ on all scores)
- [ ] Validate HTML: https://validator.w3.org/
- [ ] Test structured data: https://search.google.com/test/rich-results

### Deployment to Cloudflare Pages

**Option 1: Git + Automatic Deployments**
```bash
# 1. Create Git repository
git init
git add .
git commit -m "Initial commit: Astraea Fabrication site"

# 2. Push to GitHub/GitLab
git remote add origin YOUR_REPO_URL
git push -u origin main

# 3. Connect to Cloudflare Pages (via web UI)
#    - Build command: bun run build
#    - Output directory: _site
#    - Environment: NODE_VERSION=20
```

**Option 2: Direct Upload with Wrangler**
```bash
# 1. Install Wrangler
bun add -g wrangler

# 2. Login
wrangler login

# 3. Deploy
bun run build
wrangler pages deploy _site --project-name=astraea-fabrication
```

### Post-Deployment Tasks

- [ ] Configure custom domain
- [ ] Set up SSL (automatic with Cloudflare)
- [ ] Verify all pages load correctly
- [ ] Test on multiple devices
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google Business Profile
- [ ] Monitor analytics (if added)

## 🔍 Testing & Validation

### Performance Testing
```bash
# Run Lighthouse audit
1. Open site in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Run audit for all categories
5. Target: 95+ on all scores
```

### SEO Validation
- [ ] Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] HTML Validator: https://validator.w3.org/
- [ ] Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- [ ] PageSpeed Insights: https://pagespeed.web.dev/

## 📈 Optimization Opportunities

### Phase 2 Enhancements

1. **Blog Section** (optional):
   - Add posts directory
   - Create blog post layout
   - RSS feed (already configured)

2. **Portfolio Expansion**:
   - Add detailed project pages
   - Include before/after photos
   - Add customer testimonials with photos

3. **Interactive Features**:
   - Quote calculator
   - Material selector
   - Virtual consultation booking

4. **Analytics & Tracking**:
   - Google Analytics 4
   - Google Tag Manager
   - Conversion tracking
   - Phone call tracking

5. **Progressive Web App**:
   - Service worker
   - Offline support
   - App install prompt

## 🐛 Known Issues & Limitations

### Current Limitations

1. **CSS Not Fully Integrated with Vite**:
   - CSS files are linked but not bundled through Vite
   - No minification/optimization of CSS yet
   - Critical CSS plugin may not work until this is fixed

2. **Placeholder Images**:
   - SVG placeholders instead of real photos
   - Need actual photography for professional appearance

3. **No Contact Form Backend**:
   - Currently just displays contact information
   - Need backend integration for form submissions

### Minor Issues

- Sitemap not generating (low impact, can be fixed easily)
- No custom 500 error page
- No service worker for offline support

## 💡 Recommendations

### For Launch

1. **Must Have**:
   - Real product photography
   - Correct business information
   - Working contact method
   - Fixed CSS processing

2. **Should Have**:
   - Professional logo
   - Customer testimonials
   - Project portfolio with details
   - Before/after gallery

3. **Nice to Have**:
   - Blog section
   - Online quote form
   - Live chat integration
   - Multi-language support

### For Long-Term Success

- Regular content updates
- Add new project photos quarterly
- Collect and display customer reviews
- Blog about industry topics (SEO benefit)
- Monitor and improve Core Web Vitals
- A/B test call-to-action buttons
- Track conversion rates

## 📝 Documentation

- ✅ README.md - Project overview and getting started
- ✅ DEPLOYMENT.md - Comprehensive deployment guide
- ✅ NEXT_STEPS.md - This file
- ⚠️  TODO: Add CONTRIBUTING.md if planning team development

## 🎯 Timeline Suggestion

### Week 1: Content & Design
- Gather all photography
- Finalize copy and descriptions
- Design custom logo (if needed)
- Choose final color scheme

### Week 2: Development
- Fix CSS integration
- Replace all placeholders
- Implement contact form backend
- Final testing

### Week 3: Deployment & Launch
- Deploy to Cloudflare Pages
- Configure custom domain
- Submit to search engines
- Announce launch on social media

---

**Questions or Issues?**
Review the README.md and DEPLOYMENT.md for detailed instructions.
