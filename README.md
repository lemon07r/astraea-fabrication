# Astraea Fabrication Website

High-performance, SEO-optimized landing page for Astraea Fabrication countertop installation business.

## Tech Stack

- **Eleventy 3.0** - Static Site Generator
- **Vite 5.4** - Build Tool & Bundler
- **Bun** - Package Manager
- **PostCSS** - CSS Processing
- **Terser** - JavaScript Minification
- **Brotli/Gzip** - Compression

## Features

- ⚡ **Lightning Fast** - Optimized for Core Web Vitals
- 🎯 **Perfect SEO** - Complete meta tags, schema.org, sitemap
- 📱 **Fully Responsive** - Mobile-first design
- 🖼️ **Optimized Images** - AVIF, WebP, and JPEG with lazy loading
- 🔒 **Security Headers** - CSP, XSS protection, and more
- 📦 **Minimal Bundle** - Aggressive minification and compression
- 🎨 **Critical CSS** - Inlined above-the-fold styles

## Getting Started

### Prerequisites

- Bun 1.3+
- Node.js 20+ (for some dependencies)

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev
```

Visit `http://localhost:8080`

### Build

```bash
# Build for production
bun run build
```

Output will be in `_site/` directory.

### Preview Production Build

```bash
# Preview production build locally
bun run preview
```

### Analyze Bundle

```bash
# Generate bundle analysis
bun run analyze
```

This will create `dist/stats.html` with visual bundle analysis.

## Project Structure

```
astraea-fabrication/
├── src/
│   ├── _data/              # Site data and configuration
│   ├── _includes/          # Templates and components
│   │   ├── layouts/        # Page layouts
│   │   └── components/     # Reusable components
│   ├── assets/             # CSS, JS, and images
│   └── index.njk           # Homepage
├── public/                 # Static assets
├── _site/                  # Build output (generated)
├── .eleventy.js            # Eleventy configuration
├── vite.config.js          # Vite configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies
```

## Configuration

### Site Data

Edit `src/_data/site.js` to update:
- Business name and contact info
- Address and location
- Social media links
- Services offered

### Styling

- `src/assets/css/variables.css` - CSS custom properties
- `src/assets/css/critical.css` - Above-the-fold styles
- `src/assets/css/main.css` - Non-critical styles

## Deployment

### Cloudflare Pages

1. Connect your Git repository to Cloudflare Pages
2. Use these build settings:
   - Build command: `bun run build`
   - Build output directory: `_site`
   - Environment variables: `NODE_VERSION=20`

### Performance Targets

- Lighthouse Performance: 100
- Lighthouse SEO: 100
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- LCP: < 1.0s
- FID: < 50ms
- CLS: < 0.05

## Optimization Features

### Images
- Automatic format conversion (AVIF, WebP)
- Responsive image sizing
- Lazy loading
- Cache optimization

### CSS
- Critical CSS inlining
- Async non-critical CSS
- Advanced minification with cssnano
- CSS nesting support

### JavaScript
- Terser minification with 3 passes
- Console stripping in production
- Manual chunking
- Tree shaking

### Compression
- Brotli compression (primary)
- Gzip compression (fallback)
- Zero threshold (compress everything)

## SEO Features

- Complete meta tags (Open Graph, Twitter Cards)
- LocalBusiness schema.org markup
- XML sitemap
- robots.txt
- Canonical URLs
- Semantic HTML

## Browser Support

- Modern browsers with ES2020+ support
- Safari 14+
- Chrome 87+
- Firefox 78+
- Edge 88+

## License

MIT

## Support

For support, email info@astraeafabrication.com
