var dest = "./public/build";

module.exports = {
  js: {
    vendor: [],
    src: [],
    dest: dest,
    vendorfile: "vendor.js",
    filename: "main.js"
  },
  css: {
    src: [
      'css/normalize.css',
      'css/owl.carousel.css',
      'css/slick.css',
      'css/font-awesome.css',
      'css/style.css',
    ],
    dest: dest,
    filename: "main.css"
  },
  scss: {
    src: [
    'scss/*.scss'
    ],
    dest: dest,
    filename: "sass.css"
  },
  browserSync: {
    server: {
      baseDir: dest
    }
  }

};