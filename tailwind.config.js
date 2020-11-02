module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "2160px",
    },
    inset: {
      '0': 0,
      '1/2': '50%',
      '1/4': '25%',
      '1/6': '16%',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      default: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    }
  },
  corePlugins: {},
  plugins: [require("tailwindcss"), require("autoprefixer")],
  variants: {
    backgroundColor: ['hover']
  },
};
