module.exports = {
  plugins: [
    require("postcss-easy-import"),
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
  ],
};
