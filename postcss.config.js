export default {
  plugins: {
    'postcss-nesting': {},
    'autoprefixer': {},
    'cssnano': {
      preset: ['advanced', {
        discardComments: { removeAll: true },
        reduceIdents: true,
        mergeIdents: true,
        zindex: false,  // Preserve z-index values
        normalizeWhitespace: true,
        discardUnused: true,
        minifyFontValues: true,
        minifySelectors: true,
      }],
    },
  },
};
