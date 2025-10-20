export default {
  plugins: {
    'postcss-nesting': {},
    'autoprefixer': {},
    'cssnano': {
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: true,
      }],
    },
  },
};
