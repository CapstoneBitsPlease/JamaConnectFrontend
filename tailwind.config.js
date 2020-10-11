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
    }
  },
  corePlugins: {},
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
