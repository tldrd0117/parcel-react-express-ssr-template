
module.exports = {
  purge: {
    content: ['index.html', "**/*.tsx", "**/*.js", "**/*.ts", "**/*.html"]
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  // ...
}