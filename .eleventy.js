import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import EleventyPluginRss from '@11ty/eleventy-plugin-rss';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import htmlmin from 'html-minifier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(eleventyConfig) {
  // Passthrough copy behavior
  eleventyConfig.setServerPassthroughCopyBehavior('copy');
  eleventyConfig.addPassthroughCopy('public');
  eleventyConfig.addPassthroughCopy('src/assets/images');
  
  // RSS plugin for potential blog
  eleventyConfig.addPlugin(EleventyPluginRss);
  
  // Vite plugin integration
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite',
    
    viteOptions: {
      publicDir: 'public',
      clearScreen: false,
      appType: 'mpa',
      
      server: {
        mode: 'development',
        middlewareMode: true,
      },
      
      build: {
        mode: 'production',
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'src/assets/js/main.js'),
          },
        },
      },
      
      resolve: {
        alias: {
          '/node_modules': path.resolve(__dirname, 'node_modules'),
          '/assets': path.resolve(__dirname, 'src/assets'),
        },
      },
    },
  });
  
  // Image optimization transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'jpeg'],
    widths: [320, 640, 768, 1024, 1280, 1920],
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
      sizes: '100vw',
    },
    urlPath: '/img/',
    outputDir: path.join(__dirname, '_site', 'img'),
    cacheOptions: {
      duration: '1d',
      directory: '.cache',
    },
  });
  
  // HTML minification (aggressive)
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      });
    }
    return content;
  });
  
  // Date filters
  eleventyConfig.addFilter('dateISO', (date) => {
    return new Date(date).toISOString();
  });
  
  // Current year shortcode
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: 'layouts',
      data: '_data',
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
