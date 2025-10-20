import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';
import critical from 'rollup-plugin-critical';

export default defineConfig({
  publicDir: 'public',
  clearScreen: false,
  
  build: {
    // Use Terser for maximum compression (build time doesn't matter)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,           // Multiple passes for better compression
        pure_funcs: ['console.log', 'console.info'],
        unsafe_arrows: true,
        unsafe_methods: true,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,    // Strip all comments
      },
    },
    
    // Source maps off for production
    sourcemap: false,
    
    // Generate manifest for cache busting
    manifest: true,
    
    // Rollup-specific options
    rollupOptions: {
      output: {
        // Optimize chunk naming with content hashes
        assetFileNames: 'assets/css/[name].[hash].css',
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        
        // Manual chunking for optimal splitting
        manualChunks: (id) => {
          // Separate vendor code (if any)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      
      plugins: [
        // Critical CSS inlining
        critical({
          criticalUrl: './_site/',
          criticalBase: './_site/',
          criticalPages: [
            { uri: 'index.html', template: 'index' },
            { uri: '404.html', template: '404' }
          ],
          criticalConfig: {
            inline: true,
            dimensions: [
              { width: 375, height: 667 },   // Mobile
              { width: 1280, height: 720 },  // Desktop
              { width: 1920, height: 1080 }  // Large desktop
            ],
            penthouse: {
              timeout: 60000,
              forceInclude: ['.fonts-loaded body']
            }
          }
        }),
        
        // Bundle visualization (optional - for analysis)
        process.env.ANALYZE && visualizer({
          open: false,
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
      ].filter(Boolean),
    },
    
    // Lower warning limit for better monitoring
    chunkSizeWarningLimit: 300,
  },
  
  plugins: [
    // Image optimization
    ViteImageOptimizer({
      // PNG optimization
      png: {
        quality: 85,
      },
      // JPEG optimization
      jpeg: {
        quality: 85,
        progressive: true,
      },
      // JPG optimization
      jpg: {
        quality: 85,
        progressive: true,
      },
      // WebP optimization
      webp: {
        quality: 85,
      },
      // AVIF optimization (best compression)
      avif: {
        quality: 75,
      },
      // SVG optimization (SVGO)
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIds: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
      // Cache optimizations
      cache: true,
      cacheLocation: '.cache/images',
    }),
    
    // Brotli compression (superior to gzip)
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 0,        // Compress everything
      deleteOriginFile: false,
    }),
    
    // Gzip compression (fallback)
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 0,
      deleteOriginFile: false,
    }),
  ],
  
  // CSS optimization
  css: {
    devSourcemap: false,
    postcss: './postcss.config.js',
  },
});
