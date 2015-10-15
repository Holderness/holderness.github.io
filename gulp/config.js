var dest = "./public/build";

module.exports = {
  js: {
    vendor: [
     "javascripts/vendor/jquery.js",
     "javascripts/vendor/underscore.js",
     "javascripts/vendor/backbone.js",
     "javascripts/vendor/owl.carousel.min.js",
     "javascripts/vendor/slick.js",
    ],
    src: [
      "javascripts/models/*.js",
      "javascripts/collections/*.js",
      "javascripts/views/*.js",
      "javascripts/main.js",
      "javascripts/routers/*.js",
    ],
    dest: dest,
    vendorfile: "vendor.js",
    filename: "main.js"
  },
  css: {
    src: [
      'css/owl.carousel.css',
      'css/slick.css',
      'css/normalize.css',
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