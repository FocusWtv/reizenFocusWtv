module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  variants: {
    extend: {
      backgroundColor: ['data-hover', 'data-highlighted'],
    },
  },
  theme: {
    extend: {
       fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'normal': '200',  // Make ExtraLight the default weight
      },
    },
  },
  plugins: [require("daisyui")],
}